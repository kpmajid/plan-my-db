import { useCallback, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  NodeTypes,
  Panel,
  addEdge,
  type Node,
  type Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

import { DatabaseType } from "@/types";
import CollectionNode from "./Collection/CollectionNode";
import AddNodeDialog from "./AddNodeDialog";

interface SchemaPlannerProps {
  databaseType: DatabaseType;
}

const nodeTypes: NodeTypes = {
  // table: TableNode,
  collection: CollectionNode,
};

const SchemaPlanner = ({ databaseType }: SchemaPlannerProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [isAddNodeDialogOpen, setIsAddNodeDialogOpen] = useState(false);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) =>
      setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div className="w-full h-full flex flex-col">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={null}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position="top-left">
            <h1 className="text-2xl font-bold">
              {databaseType.charAt(0).toUpperCase() + databaseType.slice(1)}
            </h1>
          </Panel>
          <Panel position="top-right">
            <Button onClick={() => setIsAddNodeDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add{" "}
              {databaseType === "mongodb" ? "Collection" : "Table"}{" "}
            </Button>
          </Panel>
        </ReactFlow>

        <AddNodeDialog
          isOpen={isAddNodeDialogOpen}
          onClose={() => setIsAddNodeDialogOpen(false)}
          databaseType={databaseType}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default SchemaPlanner;
