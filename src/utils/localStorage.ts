import { type Node, type Edge } from "@xyflow/react";

export const loadNodes = () => {
  try {
    const serializedNodes = localStorage.getItem("nodes");
    if (!serializedNodes) {
      return [];
    }

    return JSON.parse(serializedNodes);
  } catch (error) {
    console.error("Error loading Nodes:", error);
    return [];
  }
};

export const loadEdges = () => {
  try {
    const serializedEdges = localStorage.getItem("edges");
    if (!serializedEdges) {
      return [];
    }
    return JSON.parse(serializedEdges);
  } catch (error) {
    console.error("Error loading Edges:", error);
    return [];
  }
};

export const saveState = ({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) => {
  try {
    const serializedNodes = JSON.stringify(nodes);
    const serializedEdges = JSON.stringify(edges);
    localStorage.setItem("nodes", serializedNodes);
    localStorage.setItem("edges", serializedEdges);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};
