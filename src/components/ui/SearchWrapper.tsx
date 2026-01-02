"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode,
} from "react";

import { Input } from "./Input";
import { Dropdown } from "./Dropdown";
import { cn } from "../utils";

import { createIndex, search } from "@/utils/genericSearch"; // <-- your file

export type SearchRule = {
  field: string;
  priority: number;
  mode: "prefix" | "substring";
};

type Ctx<T> = {
  focusedIndex: number;
  selected: T | null;
  items: T[];
  handleSelect: (item: T) => void;
};

const SearchWrapperContext = createContext<Ctx<any> | null>(null);

export function useSearchWrapper<T>() {
  const ctx = useContext(SearchWrapperContext);
  if (!ctx) throw new Error("SearchItem must be used inside SearchWrapper");
  return ctx as Ctx<T>;
}

type Props<T> = {
  list: T[];
  rules: SearchRule[];
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
  children: (items: T[]) => ReactNode; // you map your li's here
};

export function SearchWrapper<T extends Record<string, any>>({
  list,
  rules,
  onSelect,
  getLabel,
  children,
}: Props<T>) {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selected, setSelected] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);

  const index = useMemo(() => createIndex<T>(list, rules), [list, rules]);

  // search whenever input changes
  useEffect(() => {
    if (!inputValue.trim()) {
      setResults([]);
      return;
    }

    const r = search(index, inputValue, 25);
    setResults(r as any);
  }, [inputValue, index]);

  // auto-scroll focused item
  useEffect(() => {
    const el = ulRef.current?.children[focusedIndex] as HTMLElement;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [focusedIndex]);

  function handleSelect(item: T) {
    setSelected(item);
    onSelect(item);
    setInputValue(getLabel(item));
    setOpen(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((p) => Math.max(p - 1, 0));
        break;

      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((p) => Math.min(p + 1, results.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        const item = results[focusedIndex];
        if (item) handleSelect(item);
        break;

      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  return (
    <SearchWrapperContext.Provider
      value={{ focusedIndex, selected, items: results, handleSelect }}
    >
      <div className="relative flex-1">
        <Input
          placeholder="Search…"
          value={inputValue}
          onChange={(v) => {
            setInputValue(v);
            setOpen(v.trim().length > 0);
            setFocusedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        <Dropdown
          openState={open}
          className="w-full mt-1 p-1 max-h-60 overflow-y-auto"
        >
          <ul ref={ulRef}>{children(results)}</ul>
          {!results.length && (
            <p className="p-2 text-center text-gray-600">No results found!</p>
          )}
        </Dropdown>
      </div>
    </SearchWrapperContext.Provider>
  );
}

type SearchItemProps<T> = {
  item: T;
  index: number;
  isActive?: boolean;
  children: ReactNode;
};

export function SearchItem<T>({ item, index, children }: SearchItemProps<T>) {
  const { focusedIndex, selected, handleSelect } = useSearchWrapper<T>();

  return (
    <li
      className={cn(
        "p-2 px-3 rounded cursor-pointer",
        index === focusedIndex && "bg-accent",
        (selected as any)?._id === (item as any)._id && "bg-muted"
      )}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
}
