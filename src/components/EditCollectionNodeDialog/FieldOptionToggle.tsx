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
          className={`${
            isPressed ? "bg-secondary text-primary-foreground" : "bg-background"
          }`}
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
