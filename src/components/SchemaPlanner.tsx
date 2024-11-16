import { useCallback, useEffect, useState } from "react";

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
  IsValidConnection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

import { DatabaseType } from "@/types";
import CollectionNode from "./Collection/CollectionNode";
import AddNodeDialog from "./AddNodeDialog";
import { loadEdges, loadNodes, saveState } from "@/utils/localStorage";

interface SchemaPlannerProps {
  databaseType: DatabaseType;
}

const nodeTypes: NodeTypes = {
  // table: TableNode,
  collection: CollectionNode,
};

type GenericField = {
  id: string;
  name: string;
  type: string;
};

const SchemaPlanner = ({ databaseType }: SchemaPlannerProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const loadedNodes = loadNodes();
    const loadedEdges = loadEdges();

    setNodes(loadedNodes);
    setEdges(loadedEdges);
  }, []);

  useEffect(() => {
    saveState({ nodes, edges });
  }, [nodes, edges]);

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

  const isValidConnection: IsValidConnection = (connection) => {
    const { source, sourceHandle, target, targetHandle } = connection;
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (!sourceNode || !targetNode || !sourceHandle || !targetHandle)
      return false;

    const sourceFields = sourceNode?.data.fields as GenericField[];
    const sourceHandleId = sourceHandle.replace(/-left$/, "");
    const sourceField = sourceFields.find(
      (field) => field.id == sourceHandleId
    );

    const targetFields = targetNode?.data.fields as GenericField[];
    const targetHandleId = targetHandle.replace(/-right$/, "");
    const targetField = targetFields.find(
      (field) => field.id == targetHandleId
    );

    if (!sourceField || !targetField) return false;

    return sourceField.type === targetField.type;
  };

  return (
    <ReactFlowProvider>
      <div className="w-full h-full flex flex-col">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
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
