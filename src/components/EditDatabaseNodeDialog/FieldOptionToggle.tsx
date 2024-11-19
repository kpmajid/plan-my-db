import { ToggleGroupItem } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface FieldOptionToggleProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isPressed: boolean;
  onChange: (pressed: boolean) => void;
}

const FieldOptionToggle: React.FC<FieldOptionToggleProps> = ({
  value,
  label,
  icon,
  isPressed,
  onChange,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ToggleGroupItem
          value={value}
          aria-label={`Toggle ${label.toLowerCase()}`}
          data-state={isPressed ? "on" : "off"}
          onClick={() => onChange(!isPressed)}
          className={`
            data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
            hover:bg-background 
            border-2 border-input
            rounded-md px-3 py-2
             data-[disabled]:opacity-100 data-[disabled]:cursor-not-allowed
          `}
        >
          {icon}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FieldOptionToggle;
