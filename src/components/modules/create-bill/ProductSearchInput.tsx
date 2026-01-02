"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../ui/Input";
import { Dropdown } from "../../ui/Dropdown";
import { cn } from "../../utils";
import { useSelector } from "react-redux";
import { selectProductState } from "@/store/features/productSlice";
import { ProductDto } from "@/types/dto/productDto";
import { SearchItem, SearchRule, SearchWrapper } from "../../ui/SearchWrapper";

export const ProductSearchInput = ({
  onSelect,
}: {
  onSelect: (e: ProductDto) => void;
}) => {
  const { data: productList } = useSelector(selectProductState);

  const searchRules: SearchRule[] = [
    { field: "name", priority: 1000, mode: "prefix" },
    { field: "sku", priority: 900, mode: "prefix" },
    { field: "name", priority: 800, mode: "substring" },
    { field: "sku", priority: 700, mode: "substring" },
  ];

  return (
    <SearchWrapper
      list={productList}
      getLabel={(p) => p.name}
      onSelect={onSelect}
      rules={searchRules}
    >
      {(items) =>
        items.map((p, i) => (
          <SearchItem key={p._id} item={p} index={i}>
            <p className="text-lg">{p.name}</p>
            <p className="text-sm text-gray-600">{p.sku}</p>
          </SearchItem>
        ))
      }
    </SearchWrapper>
  );
};
