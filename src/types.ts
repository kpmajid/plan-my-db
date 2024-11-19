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

export type PostgreSQLFieldType =
  | "TEXT"
  | "INTEGER"
  | "BIGINT"
  | "REAL"
  | "DOUBLE PRECISION"
  | "BOOLEAN"
  | "DATE"
  | "TIMESTAMP"
  | "ARRAY"
  | "JSON"
  | "JSONB";

export type MySQLFieldType =
  | "VARCHAR"
  | "INT"
  | "BIGINT"
  | "FLOAT"
  | "DOUBLE"
  | "BOOLEAN"
  | "DATE"
  | "DATETIME"
  | "TEXT"
  | "JSON";

export type SQLiteFieldType =
  | "TEXT"
  | "INTEGER"
  | "REAL"
  | "BOOLEAN"
  | "DATE"
  | "DATETIME"
  | "BLOB"
  | "JSON";

export interface FieldReference {
  collectionId: Id;
  field: string;
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many";
}

export interface DatabaseField {
  id: Id;
  name: string;
  type:
    | MongoDBFieldType
    | PostgreSQLFieldType
    | MySQLFieldType
    | SQLiteFieldType;
  isRequired: boolean;
  isIndex: boolean;
  isUnique: boolean;
}

export interface DatabaseNodeData {
  label: string;
  fields: DatabaseField[];
  databaseType: DatabaseType;
}

export interface DatabaseNodeType extends Node {
  data: {
    label: string;
    fields: DatabaseField[];
    databaseType: DatabaseType;
  };
}

export type GenericField = {
  id: string;
  name: string;
  type: string;
};

