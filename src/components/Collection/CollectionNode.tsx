import { type NodeProps } from "@xyflow/react";

import { CollectionNodeType } from "@/types";
import { Button } from "../ui/button";
import Field from "./CollectionNodeField";
import EditNodeDialog from "../EditCollectionNodeDialog";
import { useState } from "react";

const CollectionNode: React.FC<NodeProps<CollectionNodeType>> = ({
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
            <Field key={field.id} field={field} />
          ))}
        </div>
      </div>
      <EditNodeDialog
        data={data}
        isOpen={isEditNodeDialogOpen}
        onClose={() => setIsEditNodeDialogOpen(false)}
      />
    </>
  );
};

export default CollectionNode;
