import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

interface ConnectionTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: string) => void;
  initialValue?: string;
}

const ConnectionTypeDialog: React.FC<ConnectionTypeDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = "one-to-one",
}) => {
  const [connectionType, setConnectionType] = useState<string>(initialValue);

  useEffect(() => {
    setConnectionType(initialValue);
  }, [initialValue]);

  const handleConfirm = () => {
    onConfirm(connectionType);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Connection Type</DialogTitle>
          <DialogDescription>
            Choose the type of relationship between these entities.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={connectionType} onValueChange={setConnectionType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-to-one" id="one-to-one" />
            <Label htmlFor="one-to-one">One-to-One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-to-many" id="one-to-many" />
            <Label htmlFor="one-to-many">One-to-Many</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="many-to-many" id="many-to-many" />
            <Label htmlFor="many-to-many">Many-to-Many</Label>
          </div>
        </RadioGroup>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionTypeDialog;
