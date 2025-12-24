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
  const options: SelectOptionType[] = [
    { value: "PCS", label: "PCS" },
    { value: "KG", label: "KG" },
    { value: "LITRE", label: "Litre" },
  ];
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
