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
import { Node } from "@xyflow/react";

interface AddNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (nodeData: Node) => void;
  databaseType: string;
}

const AddNodeDialog = ({
  isOpen,
  onClose,
  onAdd,
  databaseType,
}: AddNodeDialogProps) => {
  const [nodeName, setNodeName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultField =
      databaseType === "mongodb"
        ? {
            id: uuidv4(),
            name: "_id",
            type: "ObjectId",
            isRequired: true,
            isIndex: true,
            isUnique: true,
          }
        : {
            id: uuidv4(),
            name: "uuid",
            type: "UUID",
            isRequired: true,
            isIndex: true,
            isUnique: true,
          };

    const newNode = {
      id: uuidv4(),
      type: "collection",
      data: {
        label: nodeName,
        fields: [defaultField],
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };

    onAdd(newNode);
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
