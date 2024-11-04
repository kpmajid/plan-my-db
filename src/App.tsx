import { useState } from "react";
import { DatabaseType } from "./types";

import DatabaseSelector from "./components/DatabaseSelector";
import SchemaPlanner from "./components/SchemaPlanner";

const App = () => {
  const [databaseType, setDatabaseType] = useState<DatabaseType | null>(() => {
    const storedType = localStorage.getItem("databaseType");
    return storedType as DatabaseType | null;
  });

  const handleDatabaseSelect = (type: DatabaseType) => {
    setDatabaseType(type);
    localStorage.setItem("databaseType", type);
  };

  return (
    <div className="w-screen h-screen bg-gray-50">
      {!databaseType ? (
        <DatabaseSelector onSelect={handleDatabaseSelect} />
      ) : (
        <SchemaPlanner databaseType={databaseType} />
      )}
    </div>
  );
};

export default App;
