import { CollectionField } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import FieldRow from "./FieldRow";
import { handleFieldChange, handleRemoveField } from "./utils";

interface FieldsTableProps {
  fields: CollectionField[];
  setFields: React.Dispatch<React.SetStateAction<CollectionField[]>>;
}

const FieldsTable: React.FC<FieldsTableProps> = ({ fields, setFields }) => {
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
