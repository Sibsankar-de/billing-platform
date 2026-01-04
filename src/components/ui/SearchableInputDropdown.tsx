"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import { createIndex, search, SearchRule } from "@/utils/genericSearch";
import { SelectableInputDropdown } from "@/components/ui/SelectableInputDropdown";

type SearchableInputDropdownProps<T extends Record<string, any>> = {
  items: T[];
  rules: SearchRule<T>[];
  limit?: number;
  value?: string;
  placeholder?: string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  onChange?: (value: string) => void;
  children: (item: T, index: number) => ReactNode;
};

export function SearchableInput<T extends Record<string, any>>({
  items,
  rules,
  limit = 25,
  value = "",
  placeholder = "Type to search…",
  getLabel,
  onSelect,
  onChange,
  children,
}: SearchableInputDropdownProps<T>) {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    if (inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  const [filtered, setFiltered] = useState<T[]>([]);

  const index = useMemo(() => createIndex(items, rules), [items, rules]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFiltered([]);
      return;
    }

    const result = search(index, inputValue, limit) as T[];
    setFiltered(result);
  }, [inputValue, index, limit]);

  return (
    <SelectableInputDropdown
      items={filtered}
      value={inputValue}
      inputProps={{ autoFocus: true, placeholder }}
      getLabel={getLabel}
      onSelect={onSelect}
      onChange={(e) => {
        setInputValue(e);
        onChange?.(e);
      }}
    >
      {(items) => items.map((item, i) => children(item, i))}
    </SelectableInputDropdown>
  );
}
