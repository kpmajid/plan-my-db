import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import { DatabaseType } from "../types";

const databaseOptions = [
  { id: "postgresql", name: "PostgreSQL", icon: "🐘" },
  { id: "mysql", name: "MySQL", icon: "🐬" },
  { id: "mongodb", name: "MongoDB", icon: "🍃" },
  { id: "sqlite", name: "SQLite", icon: "📊" },
];

interface DatabaseSelectorProps {
  onSelect: (type: DatabaseType) => void;
}

const DatabaseSelector = ({ onSelect }: DatabaseSelectorProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Select Database Type</CardTitle>
          <CardDescription>
            Choose the database you want to plan the schema for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {databaseOptions.map((db) => (
              <Button
                key={db.id}
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => onSelect(db.id as DatabaseType)}
              >
                <span className="text-2xl">{db.icon}</span>
                <span>{db.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSelector;
