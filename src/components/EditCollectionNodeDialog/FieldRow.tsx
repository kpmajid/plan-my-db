import { CollectionField, MongoDBFieldType } from "@/types";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trash2 } from "lucide-react";
import FieldOptions from "./FieldOptions";

interface FieldRowProps {
  field: CollectionField;
  onFieldChange: (updates: Partial<CollectionField>) => void;
  onRemoveField: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  onFieldChange,
  onRemoveField,
}) => {
  const isIdField = field.name === "_id";
  const fieldTypes = [
    "String",
    "Number",
    "Boolean",
    "Date",
    "Array",
    "Object",
    "ObjectId",
  ];

  return isIdField ? (
    <TableRow>
      <TableCell>{field.name}</TableCell>
      <TableCell>{field.type}</TableCell>
      <TableCell>
        <FieldOptions
          field={field}
          isIdField={isIdField}
          onFieldChange={onFieldChange}
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell>
        <Input
          value={field.name}
          onChange={(e) => onFieldChange({ name: e.target.value })}
          disabled={isIdField}
        />
      </TableCell>
      <TableCell>
        <Select
          value={field.type}
          onValueChange={(value: MongoDBFieldType) =>
            onFieldChange({ type: value })
          }
          disabled={isIdField}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <FieldOptions
          field={field}
          isIdField={isIdField}
          onFieldChange={onFieldChange}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={onRemoveField}
          disabled={isIdField}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FieldRow;
