import { v4 as uuidv4 } from "uuid";
import { DatabaseField, DatabaseType, Id } from "@/types";

export function handleFieldChange(
  fieldId: Id,
  updates: Partial<DatabaseField>,
  fields: DatabaseField[],
  setFields: React.Dispatch<React.SetStateAction<DatabaseField[]>>
) {
  setFields(
    fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    )
  );
}

export function handleRemoveField(
  fieldId: Id,
  fields: DatabaseField[],
  setFields: React.Dispatch<React.SetStateAction<DatabaseField[]>>
) {
  setFields(fields.filter((field) => field.id !== fieldId));
}

export function handleAddField(
  databasaeType: DatabaseType,
  fields: DatabaseField[],
  setFields: React.Dispatch<React.SetStateAction<DatabaseField[]>>
) {
  const dataType = databasaeType === "mongodb" ? "String" : "TEXT";
  const newField: DatabaseField = {
    id: uuidv4(),
    name: `New Field ${fields.length + 1}`,
    type: dataType,
    isRequired: false,
    isIndex: false,
    isUnique: false,
  };
  setFields([...fields, newField]);
}

const fieldTypesMap: Record<DatabaseType, string[]> = {
  mongodb: [
    "String",
    "Number",
    "Boolean",
    "Date",
    "Array",
    "Object",
    "ObjectId",
  ],
  postgresql: [
    "TEXT",
    "INTEGER",
    "BIGINT",
    "REAL",
    "DOUBLE PRECISION",
    "BOOLEAN",
    "DATE",
    "TIMESTAMP",
    "ARRAY",
    "JSON",
    "JSONB",
  ],
  mysql: [
    "VARCHAR",
    "INT",
    "BIGINT",
    "FLOAT",
    "DOUBLE",
    "BOOLEAN",
    "DATE",
    "DATETIME",
    "TEXT",
    "JSON",
  ],
  sqlite: [
    "TEXT",
    "INTEGER",
    "REAL",
    "BOOLEAN",
    "DATE",
    "DATETIME",
    "BLOB",
    "JSON",
  ],
};

export const getFieldTypes = (databaseType: DatabaseType): string[] => {
  return fieldTypesMap[databaseType] || [];
};
