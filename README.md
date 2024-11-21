# Database Schema Planner

A visual tool for planning and designing database schemas. This application supports multiple database types and allows users to create, edit, and visualize database schemas interactively.

## Features

- Support for multiple database types (currently including MongoDB and SQL databases)
- Interactive node-based schema design
- Dynamic creation and editing of database tables/collections
- Relationship mapping between entities
- Real-time validation of connections based on field data types
- Persistent storage of schemas using localStorage
- Settings dialog for application management, including a reset functionality

## Technologies Used

- React
- TypeScript
- React Flow
- Tailwind CSS
- shadcn/ui components

## Installation

1. Clone the repository:
```
git clone https://github.com/kpmajid/plan-my-db.git
```

2. Navigate to the project directory:
```
cd plan-my-db
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm run dev
```

## Usage

1. Open the application in your web browser.
2. Select the database type you want to work with.
3. Use the "Add Table/Collection" button to create new entities.
4. Drag and drop to position your entities on the canvas.
5. Connect entities to create relationships.
6. Double-click on connections to edit relationship types.
7. Use the settings gear icon to access additional options, including resetting the application.
