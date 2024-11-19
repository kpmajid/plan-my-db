import { type NodeProps } from "@xyflow/react";

import { DatabaseNodeType } from "@/types";
import NodeField from "./NodeField";
import EditDatabaseNodeDialog from "./EditDatabaseNodeDialog";
import { useState } from "react";
import { Button } from "./ui/button";

const DatabaseNode: React.FC<NodeProps<DatabaseNodeType>> = ({
  data,
  selected,
}) => {
  const [isEditNodeDialogOpen, setIsEditNodeDialogOpen] = useState(false);

  return (
    <>
      <div
        className={`shadow-lg rounded-md bg-card border-2 border-border w-[300px] ${
          selected ? "border-blue-500" : ""
        } `}
      >
        <div className="p-4 bg-muted flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{data.label}</h3>
          {selected && (
            <Button
              className="nodrag"
              onClick={() => setIsEditNodeDialogOpen(true)}
            >
              Edit
            </Button>
          )}
        </div>
        <div className="">
          {data.fields.map((field) => (
            <NodeField key={field.id} field={field} />
          ))}
        </div>
      </div>
      <EditDatabaseNodeDialog
        data={data}
        isOpen={isEditNodeDialogOpen}
        onClose={() => setIsEditNodeDialogOpen(false)}
      />
    </>
  );
};

export default DatabaseNode;
