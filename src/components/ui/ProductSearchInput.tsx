"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { Dropdown } from "./Dropdown";
import { cn } from "../utils";
import { createProductIndex, searchProducts } from "@/utils/ProductSearch";
import { useSelector } from "react-redux";
import { selectProductState } from "@/store/features/productSlice";
import { ProductDto } from "@/types/dto/productDto";

export const ProductSearchInput = ({
  onSelect,
}: {
  onSelect: (e: ProductDto) => void;
}) => {
  const { data: productList } = useSelector(selectProductState);

  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState<ProductDto[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<ProductDto | null>(
    null
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  const { indexed, sortedByName } = createProductIndex(productList);

  // update search results
  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredList([]);
      return;
    }

    const results = searchProducts(indexed, sortedByName, inputValue);
    setFilteredList(results);
  }, [inputValue]);

  // auto scroll
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const item = list.children[focusedIndex] as HTMLElement;
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [focusedIndex]);

  function handleSelect(item: ProductDto) {
    setSelectedElement(item);
    onSelect(item);
    setInputValue(item.name);
    setOpenDropdown(false);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;

      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, filteredList.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        const selected = filteredList[focusedIndex];
        if (selected) {
          handleSelect(selected);
        }
        break;
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setOpenDropdown(value.trim().length > 0);
    setFocusedIndex(0);
  };

  return (
    <div className="relative flex-1">
      <Input
        id="product"
        placeholder="Search a product"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoFocus
      />

      <Dropdown
        openState={openDropdown}
        className="w-full mt-1 p-1 max-h-60 overflow-y-auto"
      >
        <ul ref={listRef}>
          {filteredList.map((item, index) => (
            <li
              key={item._id}
              className={cn(
                "p-2 px-3 rounded cursor-pointer",
                index === focusedIndex && "bg-accent",
                selectedElement?._id === item._id && "bg-muted"
              )}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(item)}
            >
              <p className="text-lg">{item.name}</p>
              <p className="text-sm text-gray-600">{item.sku}</p>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};
