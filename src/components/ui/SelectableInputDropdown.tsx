"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode,
} from "react";

import { Input, InputType } from "./Input";
import { Dropdown } from "./Dropdown";
import { cn } from "../utils";

type Ctx<T> = {
  focusedIndex: number;
  selected: T | null;
  items: T[];
  handleSelect: (item: T) => void;
};

const SearchWrapperContext = createContext<Ctx<any> | null>(null);

export function useSelectableInputDropdown<T>() {
  const ctx = useContext(SearchWrapperContext);
  if (!ctx) throw new Error("SearchItem must be used inside SearchWrapper");
  return ctx as Ctx<T>;
}

type Props<T> = {
  items: T[];
  value: string;
  inputProps?: InputType;
  onChange: (value: string) => void;
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
  children: (items: T[]) => ReactNode;
};

export function SelectableInputDropdown<T>({
  items,
  value,
  inputProps,
  onChange,
  onSelect,
  getLabel,
  children,
}: Props<T>) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selected, setSelected] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);

  // auto scroll focused item
  useEffect(() => {
    const el = ulRef.current?.children[focusedIndex] as HTMLElement;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [focusedIndex, items]);

  function handleSelect(item: T) {
    setSelected(item);
    onSelect(item);
    onChange(getLabel(item));
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
        setFocusedIndex((p) => Math.min(p + 1, items.length - 1));
        break;

      case "Enter":
        e.preventDefault();
        const item = items[focusedIndex];
        if (item) handleSelect(item);
        break;
    }
  }

  return (
    <SearchWrapperContext.Provider
      value={{ focusedIndex, selected, items, handleSelect }}
    >
      <div className="relative flex-1">
        <Input
          placeholder={inputProps?.placeholder || "Search…"}
          value={value}
          onChange={(v) => {
            onChange(v); // parent filters
            setOpen(v.trim().length > 0); // only toggle dropdown
            setFocusedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          {...inputProps}
        />

        <Dropdown
          openState={open}
          className="w-full mt-1 p-1 max-h-60 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <ul ref={ulRef}>{children(items)}</ul>

          {!items.length && (
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
  children: ReactNode;
};

export function SelectableItem<T>({
  item,
  index,
  children,
}: SearchItemProps<T>) {
  const { focusedIndex, selected, handleSelect } =
    useSelectableInputDropdown<T>();

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
