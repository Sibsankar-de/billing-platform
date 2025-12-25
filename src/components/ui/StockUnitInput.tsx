import { unitMap } from "@/constants/UnitMaps";
import { Select } from "./Select";
import { SelectOptionType } from "@/types/SelectType";

export const StockUnitInput = ({
  id,
  onChange,
  value,
  disabled,
}: {
  id?: string;
  onChange?: (e: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const options: SelectOptionType[] = unitMap;
  return (
    <Select
      id={id}
      options={options}
      value={value || "PCS"}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
