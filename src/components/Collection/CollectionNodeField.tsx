import { Handle, Position } from "@xyflow/react";
import { Asterisk, Hash, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Id, MongoDBFieldType } from "@/types";

interface CollectionNodeFieldProps {
  field: {
    id: Id;
    name: string;
    type: MongoDBFieldType;
    isRequired: boolean;
    isIndex: boolean;
    isUnique: boolean;
  };
}

const CollectionNodeField: React.FC<CollectionNodeFieldProps> = ({ field }) => {
  return (
    <div
      key={field.id}
      className="flex items-center justify-between py-2 relative"
    >
      <Handle
        type="source"
        position={Position.Left}
        id={`${field.id}-left`}
        style={{
          width: 8,
          height: 8,
          opacity: 1,
        }}
      />
      <div className="flex items-center justify-between space-x-2 flex-grow px-3">
        <div className="flex gap-2">
          <span className="text-sm font-medium">{field.name}</span>
          <div className="flex items-center space-x-1">
            {field.isRequired && (
              <Badge variant="outline" className="px-1">
                <Asterisk className="h-3 w-3" />
              </Badge>
            )}
            {field.isIndex && (
              <Badge variant="outline" className="px-1">
                <Hash className="h-3 w-3" />
              </Badge>
            )}
            {field.isUnique && (
              <Badge variant="outline" className="px-1">
                <Fingerprint className="h-3 w-3" />
              </Badge>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">({field.type})</span>
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id={`${field.id}-right`}
        style={{
          width: 8,
          height: 8,
          opacity: 1,
        }}
      />
    </div>
  );
};

export default CollectionNodeField;
