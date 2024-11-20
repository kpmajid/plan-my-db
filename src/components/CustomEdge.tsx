import { useState } from "react";

import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  type Edge,
  useReactFlow,
} from "@xyflow/react";

import { X } from "lucide-react";
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

type CustomEdgeProps = Edge<{ label: string }>;

const CustomEdge: React.FC<EdgeProps<CustomEdgeProps>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState(
    data?.label || "one-to-one"
  );

  const handleDelete = () => {
    setEdges((es) => es.filter((e) => e.id !== id));
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id
          ? { ...edge, data: { ...edge.data, label: connectionType } }
          : edge
      )
    );
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div
            className="relative bg-white border border-gray-200 rounded-md shadow-sm p-2 text-sm"
            onDoubleClick={handleEdit}
          >
            {selected && (
              <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <div className="font-medium text-gray-700">
              {data?.label || "Connection"}
            </div>
          </div>
        </div>
      </EdgeLabelRenderer>

      <Dialog
        open={isEditDialogOpen}
        onOpenChange={() => setIsEditDialogOpen(false)}
      >
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
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomEdge;
