import type { NodeProps } from "@xyflow/react";

import { CollectionNodeType } from "@/types";
import { Button } from "./ui/button";
import CollectionField from "./CollectionField";

const CollectionNode = ({ data, selected }: NodeProps<CollectionNodeType>) => {
  return (
    <div
      className={`shadow-lg rounded-md bg-card border-2 border-border w-[300px] ${
        selected ? "border-blue-500" : ""
      } hover:cursor-pointer`}
    >
      <div className="p-4 bg-muted flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">{data.label}</h3>
        {selected && (
          <Button onClick={() => console.log("clicked?")}>Edit</Button>
        )}
      </div>
      <div className="">
        {data.fields.map((field) => (
          <CollectionField key={field.id} field={field} />
        ))}
      </div>
    </div>
  );
};

export default CollectionNode;
