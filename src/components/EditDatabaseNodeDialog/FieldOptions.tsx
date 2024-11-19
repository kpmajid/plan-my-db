import { Asterisk, Fingerprint, Hash } from "lucide-react";
import { ToggleGroup } from "../ui/toggle-group";
import { TooltipProvider } from "../ui/tooltip";
import { DatabaseField } from "@/types";
import FieldOptionToggle from "./FieldOptionToggle";

interface FieldOptionsProps {
  field: DatabaseField;
  isIdField: boolean;
  onFieldChange: (updates: Partial<DatabaseField>) => void;
}

const FieldOptions: React.FC<FieldOptionsProps> = ({
  field,
  isIdField,
  onFieldChange,
}) => {
  return (
    <TooltipProvider>
      <ToggleGroup
        disabled={isIdField}
        variant="outline"
        type="multiple"
        className="justify-start"
      >
        <FieldOptionToggle
          value="isRequired"
          label="Required"
          icon={<Asterisk className="h-4 w-4" />}
          isPressed={field.isRequired}
          onChange={(pressed) => onFieldChange({ isRequired: pressed })}
        />
        <FieldOptionToggle
          value="isIndex"
          label="Index"
          icon={<Hash className="h-4 w-4" />}
          isPressed={field.isIndex}
          onChange={(pressed) => onFieldChange({ isIndex: pressed })}
        />
        <FieldOptionToggle
          value="isUnique"
          label="Unique"
          icon={<Fingerprint className="h-4 w-4" />}
          isPressed={field.isUnique}
          onChange={(pressed) => onFieldChange({ isUnique: pressed })}
        />
      </ToggleGroup>
    </TooltipProvider>
  );
};

export default FieldOptions;
