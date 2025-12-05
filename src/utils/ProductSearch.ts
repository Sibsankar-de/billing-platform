export function createProductIndex(products: Record<string, any>[]) {
  const indexed = products.map((p) => ({
    ...p,
    searchableName: p.name.toLowerCase(),
    searchableSku: p.sku.toLowerCase(),
  }));

  // Sort for fast prefix binary search
  const sortedByName = [...indexed].sort((a, b) =>
    a.searchableName.localeCompare(b.searchableName)
  );

  return { indexed, sortedByName };
}

function binarySearchPrefix(list: any[], key: string, field: string) {
  let low = 0;
  let high = list.length - 1;
  let firstMatchIndex = -1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const value = list[mid][field];

    if (value.startsWith(key)) {
      firstMatchIndex = mid;
      high = mid - 1;
    } else if (value < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return firstMatchIndex;
}

export function searchProducts(
  indexedList: any[],
  sortedByName: any[],
  query: string
) {
  if (!query.trim()) return [];

  const key = query.toLowerCase();
  const results: any[] = [];

  // =====================================================
  // 1. NAME PREFIX MATCHES (HIGHEST PRIORITY)
  // =====================================================
  const startIndex = binarySearchPrefix(sortedByName, key, "searchableName");

  if (startIndex !== -1) {
    for (let i = startIndex; i < sortedByName.length; i++) {
      const item = sortedByName[i];
      if (!item.searchableName.startsWith(key)) break;

      results.push({
        ...item,
        rank: 1000, // Highest rank
        matchPosition: 0,
      });

      if (results.length >= 20) break;
    }
  }

  // =====================================================
  // 2. SKU PREFIX MATCHES
  // =====================================================
  indexedList
    .filter((p) => p.searchableSku.startsWith(key))
    .forEach((item) =>
      results.push({
        ...item,
        rank: 900,
        matchPosition: 0,
      })
    );

  // =====================================================
  // 3. NAME SUBSTRING MATCHES (ANYWHERE)
  // =====================================================
  indexedList.forEach((item) => {
    const pos = item.searchableName.indexOf(key);
    if (pos > 0) {
      results.push({
        ...item,
        rank: 800 - pos, // earlier index = higher rank
        matchPosition: pos,
      });
    }
  });

  // =====================================================
  // 4. SKU SUBSTRING MATCHES (ANYWHERE)
  // =====================================================
  indexedList.forEach((item) => {
    const pos = item.searchableSku.indexOf(key);
    if (pos > 0) {
      results.push({
        ...item,
        rank: 700 - pos,
        matchPosition: pos,
      });
    }
  });

  // =====================================================
  // 5. MERGE, DEDUPE, SORT BY:
  // rank DESC
  // matchPosition ASC (earlier index = more relevant)
  // =====================================================
  const unique = new Map();
  results.forEach((item) => unique.set(item._id ?? item.id, item));

  return Array.from(unique.values())
    .sort((a, b) => {
      if (b.rank !== a.rank) return b.rank - a.rank;
      return a.matchPosition - b.matchPosition;
    })
    .slice(0, 25);
}
