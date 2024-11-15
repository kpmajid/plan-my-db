import { v4 as uuidv4 } from "uuid";
import { CollectionField, Id } from "@/types";

export function handleFieldChange(
  fieldId: Id,
  updates: Partial<CollectionField>,
  fields: CollectionField[],
  setFields: React.Dispatch<React.SetStateAction<CollectionField[]>>
) {
  setFields(
    fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    )
  );
}

export function handleRemoveField(
  fieldId: Id,
  fields: CollectionField[],
  setFields: React.Dispatch<React.SetStateAction<CollectionField[]>>
) {
  setFields(fields.filter((field) => field.id !== fieldId));
}

export function handleAddField(
  fields: CollectionField[],
  setFields: React.Dispatch<React.SetStateAction<CollectionField[]>>
) {
  const newField: CollectionField = {
    id: uuidv4(),
    name: `New Field ${fields.length + 1}`,
    type: "String",
    isRequired: false,
    isIndex: false,
    isUnique: false,
  };
  setFields([...fields, newField]);
}
