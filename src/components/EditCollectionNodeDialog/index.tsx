import { useEffect, useState } from "react";

import { CollectionField, CollectionNodeData } from "@/types";
import EntityHeader from "./EntityHeader";
import FieldsTable from "./FieldsTable";

import { handleAddField } from "./utils";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useNodeId, useReactFlow } from "@xyflow/react";

interface EditNodeDialogProps {
  data: CollectionNodeData;
  isOpen: boolean;
  onClose: () => void;
}

const EditNodeDialog: React.FC<EditNodeDialogProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const { updateNode } = useReactFlow();
  const id = useNodeId();
  const [label, setLabel] = useState(data?.label || "");
  const [fields, setFields] = useState<CollectionField[]>(data?.fields || []);

  const [hasChanges, setHasChanges] = useState(false);
  const [isConfirmCloseDialogOpen, setIsConfirmCloseDialogOpen] =
    useState(false);

  useEffect(() => {
    setHasChanges(
      label !== data?.label ||
        JSON.stringify(fields) !== JSON.stringify(data?.fields)
    );
  }, [label, fields, data?.label, data?.fields]);

  const handleClose = () => {
    if (hasChanges) {
      setIsConfirmCloseDialogOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmCloseDialogOpen(false);
    setLabel(data.label);
    setFields(data.fields);
    onClose();
  };

  const handleSave = () => {
    if (id == null) {
      return;
    }
    updateNode(id, (node) => ({
      ...node,
      data: {
        ...node.data,
        label: label,
        fields: fields,
      },
    }));
    setHasChanges(false);
    onClose();
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              <EntityHeader label={label} setLabel={setLabel} />
            </DialogTitle>
          </DialogHeader>
          <FieldsTable fields={fields} setFields={setFields} />
          <Button
            onClick={() => handleAddField(fields, setFields)}
            className="mt-4"
          >
            Add Field
          </Button>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isConfirmCloseDialogOpen}
        onOpenChange={setIsConfirmCloseDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close without
              saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              Close without saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditNodeDialog;
