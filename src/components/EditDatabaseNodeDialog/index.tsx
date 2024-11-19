import { DatabaseNodeData } from "@/types";

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
import { Button } from "@/components/ui/button";

import { useNodeId, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import EntityHeader from "./EntityHeader";
import FieldsTable from "./FieldsTable";
import { handleAddField } from "./utils";

interface EditDatabaseNodeDialogProps {
  data: DatabaseNodeData;
  isOpen: boolean;
  onClose: () => void;
}

const EditDatabaseNodeDialog: React.FC<EditDatabaseNodeDialogProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const { updateNode } = useReactFlow();
  const id = useNodeId();
  const [label, setLabel] = useState(data?.label || "");
  const [fields, setFields] = useState(data?.fields || []);

  const [hasChanges, setHasChanges] = useState(false);
  const [isConfirmCloseDialogOpen, setIsConfirmCloseDialogOpen] =
    useState(false);

  const databasaeType = data.databaseType;

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
              <EntityHeader
                label={label}
                setLabel={setLabel}
                databasaeType={databasaeType}
              />
            </DialogTitle>
          </DialogHeader>

          <FieldsTable
            databasaeType={databasaeType}
            fields={fields}
            setFields={setFields}
          />
          <Button
            onClick={() => handleAddField(databasaeType, fields, setFields)}
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

export default EditDatabaseNodeDialog;
