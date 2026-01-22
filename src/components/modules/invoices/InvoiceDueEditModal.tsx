import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { X } from "lucide-react";
import { useState } from "react";

export const InvoiceDueEditModal = ({
  openState,
  onClose,
}: {
  openState: boolean;
  onClose: () => void;
}) => {
  const [input, setInput] = useState("");
  return (
    <Modal openState={openState} onClose={onClose} className="space-y-6 w-100">
      <div className="flex gap-2 justify-between mb-6">
        <h3 className="text-lg">Update Due</h3>
        <Button variant="outline" className="p-2" onClick={onClose}>
          <X size={15} />
        </Button>
      </div>
      <div>
        <Label htmlFor="due-amount">Enter paid Amount</Label>
        <Input placeholder="Enter paid amount" type="number" id="due-amount" />
      </div>
      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </Modal>
  );
};
