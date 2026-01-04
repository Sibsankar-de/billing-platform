"use client";

import { useSelector } from "react-redux";
import { selectProductState } from "@/store/features/productSlice";
import { ProductDto } from "@/types/dto/productDto";
import { SelectableItem } from "@/components/ui/SelectableInputDropdown";
import { SearchableInput } from "@/components/ui/SearchableInputDropdown";

export function ProductSearchInput({
  onSelect,
}: {
  onSelect: (p: ProductDto) => void;
}) {
  const {
    data: { productList },
  } = useSelector(selectProductState);

  const rules: any = [
    { field: "name", priority: 1000, mode: "prefix" },
    { field: "sku", priority: 900, mode: "prefix" },
    { field: "name", priority: 800, mode: "substring" },
    { field: "sku", priority: 700, mode: "substring" },
  ];

  return (
    <SearchableInput
      items={productList}
      rules={rules}
      getLabel={(p) => p.name}
      onSelect={onSelect}
      placeholder="Type a product..."
    >
      {(p, i) => (
        <SelectableItem key={p._id} item={p} index={i}>
          <p className="text-lg">{p.name}</p>
          <p className="text-sm text-gray-600">{p.sku}</p>
        </SelectableItem>
      )}
    </SearchableInput>
  );
}
