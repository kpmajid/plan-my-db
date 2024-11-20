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
import ConnectionTypeDialog from "./ConnectionTypeDialog";

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

  const handleDelete = () => {
    setEdges((es) => es.filter((e) => e.id !== id));
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditConfirm = (connectionType: string) => {
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

      <ConnectionTypeDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onConfirm={handleEditConfirm}
        initialValue={data?.label}
      />
    </>
  );
};

export default CustomEdge;
