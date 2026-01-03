"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectProductState } from "@/store/features/productSlice";
import { ProductDto } from "@/types/dto/productDto";
import {
  SelectableItem,
  SelectableInputDropdown,
} from "../../ui/SelectableInputDropdown";
import { createIndex, search } from "@/utils/genericSearch";

export const ProductSearchInput = ({
  onSelect,
}: {
  onSelect: (e: ProductDto) => void;
}) => {
  const {
    data: { productList },
  } = useSelector(selectProductState);

  const searchRules: any = [
    { field: "name", priority: 1000, mode: "prefix" },
    { field: "sku", priority: 900, mode: "prefix" },
    { field: "name", priority: 800, mode: "substring" },
    { field: "sku", priority: 700, mode: "substring" },
  ];

  const index = useMemo(
    () => createIndex(productList, searchRules),
    [productList]
  );

  const [value, setValue] = useState("");
  const [filteredList, setFilteredList] = useState<typeof productList>([]);

  useEffect(() => {
    if (!value.trim()) return;

    const r = search(index, value, 25);
    setFilteredList(r as any);
  }, [value, index]);

  return (
    <SelectableInputDropdown
      items={filteredList}
      value={value}
      inputProps={{
        autoFocus: true,
        placeholder: "Type a product...",
      }}
      getLabel={(p) => p.name}
      onSelect={onSelect}
      onChange={setValue}
    >
      {(items) =>
        items.map((p, i) => (
          <SelectableItem key={p._id} item={p} index={i}>
            <p className="text-lg">{p.name}</p>
            <p className="text-sm text-gray-600">{p.sku}</p>
          </SelectableItem>
        ))
      }
    </SelectableInputDropdown>
  );
};
