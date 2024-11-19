import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Node, useReactFlow } from "@xyflow/react";

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  databaseType: string;
}

const AddNodeDialog: React.FC<AddNodeDialogProps> = ({
  isOpen,
  onClose,
  databaseType,
}) => {
  const { addNodes } = useReactFlow();
  const [nodeName, setNodeName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultField = {
      id: uuidv4(),
      name: databaseType === "mongodb" ? "_id" : "id",
      type: databaseType === "mongodb" ? "ObjectId" : "UUID",
      isRequired: true,
      isIndex: true,
      isUnique: true,
    };

    const newNode: Node = {
      id: uuidv4(),
      type: "databaseNode",
      data: {
        label: nodeName,
        fields: [defaultField],
        databaseType,
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };

    addNodes(newNode);
    setNodeName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add {databaseType === "mongodb" ? "Collection" : "Table"}
          </DialogTitle>
          <DialogDescription>
            Enter {databaseType === "mongodb" ? "Collection" : "Table"} name:
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNodeDialog;
