import { type Node } from "@xyflow/react";

export type DatabaseType = "postgresql" | "mysql" | "mongodb" | "sqlite";

export type Id = string | number;

export type MongoDBFieldType =
  | "String"
  | "Number"
  | "Boolean"
  | "Date"
  | "Array"
  | "Object"
  | "ObjectId";

export interface FieldReference {
  collectionId: Id;
  field: string;
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface CollectionField {
  id: Id;
  name: string;
  type: MongoDBFieldType;
  isRequired?: boolean;
  isIndex?: boolean;
  isUnique?: boolean;
}

export interface CollectionNodeType extends Node {
  data: {
    label: string;
    fields: CollectionField[];
  };
}
