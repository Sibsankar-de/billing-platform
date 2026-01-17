"use client";

import { Button } from "@/components/ui/Button";
import { ConditionalDiv } from "@/components/ui/ConditionalDiv";
import { Input } from "@/components/ui/Input";
import { selectCurrentStoreState } from "@/store/features/currentStoreSlice";
import { CustomUnitType } from "@/types/dto/storeDto";
import { Edit, Plus, Ruler, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const ProductUnitAddSection = ({
  onChange,
}: {
  onChange: (item: CustomUnitType[]) => void;
}) => {
  const {
    data: { storeSettings },
  } = useSelector(selectCurrentStoreState);

  const [unitList, setUnitList] = useState<CustomUnitType[]>([]);
  const [input, setInput] = useState({
    value: "",
    label: "",
  });

  const [editItem, setEditItem] = useState<CustomUnitType | null>(null);

  useEffect(() => {
    if (storeSettings.customUnits?.length) {
      setUnitList(storeSettings.customUnits);
    }
  }, [storeSettings]);

  const handleAddUnit = () => {
    if (!input.value || !input.label) {
      toast.warn("Value and label is required!");
      return;
    }

    if (unitList.find((e) => e.value === input.value)) {
      toast.warn(`Unit with value "${input.value}" already exists`);
      return;
    }

    setUnitList((p) => [...p, input]);
    setInput({
      label: "",
      value: "",
    });
  };

  const handleEdit = () => {
    if (!editItem) return;

    if (!input.value || !input.label) {
      toast.warn("Value and label is required!");
      return;
    }
    if (
      editItem.value !== input.value &&
      unitList.find((e) => e.value === input.value)
    ) {
      toast.warn(`Unit with value "${input.value}" already exists`);
      return;
    }

    setUnitList((prev) =>
      prev.map((item) => {
        if (item.value === editItem.value) {
          return input;
        }
        return item;
      }),
    );

    handleCancelEdit();
  };

  const handleDelete = (value: string) => {
    setUnitList((prev) => prev.filter((item) => item.value !== value));
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setInput({
      label: "",
      value: "",
    });
  };

  useEffect(() => {
    onChange(unitList);
  }, [unitList]);

  return (
    <div className="w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Unit value. eg, CARTON"
            value={input.value}
            onChange={(e) => setInput((p) => ({ ...p, value: e }))}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Unit label. eg, Carton"
            value={input.label}
            onChange={(e) => setInput((p) => ({ ...p, label: e }))}
          />
        </div>

        {!editItem ? (
          <Button
            disabled={!input.value || !input.label}
            onClick={handleAddUnit}
          >
            <Plus size={18} />
          </Button>
        ) : (
          <>
            <Button
              disabled={!input.value || !input.label}
              onClick={handleEdit}
            >
              <Save size={18} />
            </Button>
            <Button
              variant="outline"
              className="text-red-300"
              onClick={handleCancelEdit}
            >
              <X size={18} />
            </Button>
          </>
        )}
      </div>

      <ConditionalDiv
        condition={unitList.length}
        className="p-3 bg-gray-100 rounded-lg space-y-2"
      >
        {unitList.map((item) => (
          <UnitItem
            key={item.value}
            unitData={item}
            onEdit={(e) => {
              setEditItem(e);
              setInput(e);
            }}
            onDelete={handleDelete}
          />
        ))}
      </ConditionalDiv>
    </div>
  );
};

function UnitItem({
  unitData,
  onEdit,
  onDelete,
}: {
  unitData: CustomUnitType;
  onEdit: (item: CustomUnitType) => void;
  onDelete: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Ruler className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p>{unitData.label}</p>
          <p className="text-sm">{unitData.value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="text-primary"
          onClick={() => onEdit(unitData)}
        >
          <Edit size={15} />
        </Button>
        <Button
          variant="outline"
          className="text-red-400"
          onClick={() => onDelete(unitData.value)}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
}
