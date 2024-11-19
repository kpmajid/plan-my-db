import { DatabaseField, DatabaseType } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { handleFieldChange, handleRemoveField } from "./utils";
import FieldRow from "./FieldRow";

interface FieldsTableProps {
  databasaeType: DatabaseType;
  fields: DatabaseField[];
  setFields: React.Dispatch<React.SetStateAction<DatabaseField[]>>;
}

const FieldsTable: React.FC<FieldsTableProps> = ({
  databasaeType,
  fields,
  setFields,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Name</TableHead>
          <TableHead className="w-[30%]">Type</TableHead>
          <TableHead className="w-[30%]">Options</TableHead>
          <TableHead className="w-[10%]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <FieldRow
            key={field.id}
            databasaeType={databasaeType}
            field={field}
            onFieldChange={(updates) =>
              handleFieldChange(field.id, updates, fields, setFields)
            }
            onRemoveField={() => handleRemoveField(field.id, fields, setFields)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FieldsTable;
