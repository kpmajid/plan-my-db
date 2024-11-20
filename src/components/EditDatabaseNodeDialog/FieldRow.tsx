import { DatabaseField, DatabaseType, MongoDBFieldType } from "@/types";
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
import { getFieldTypes } from "./utils";

interface FieldRowProps {
  databasaeType: DatabaseType;
  field: DatabaseField;
  onFieldChange: (updates: Partial<DatabaseField>) => void;
  onRemoveField: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  databasaeType,
  field,
  onFieldChange,
  onRemoveField,
}) => {
  const isIdField = ["_id", "id"].includes(field.name);

  const fieldTypes = getFieldTypes(databasaeType);

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
        />
      </TableCell>
      <TableCell>
        <Select
          value={field.type}
          onValueChange={(value: MongoDBFieldType) =>
            onFieldChange({ type: value })
          }
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
        <Button variant="destructive" size="sm" onClick={onRemoveField}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FieldRow;
