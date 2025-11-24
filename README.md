# Task Management System

A full-stack Task Management System built with React, Node.js, Express, and MongoDB. This application allows users to create, read, update, and delete tasks with proper error handling, validation, and a modern user interface.

## Features

- Create, Read, Update, and Delete (CRUD) operations for tasks
- Task filtering by status and priority
-  Task sorting by date, priority, and status
-  Task status management (Pending, In Progress, Completed)
-  Priority levels (Low, Medium, High)
-  Due date tracking with overdue indicators
-  Responsive design with modern UI
-  Comprehensive error handling
-  Input validation on both client and server
-  RESTful API architecture

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator for input validation
- CORS enabled

## Project Structure

```
TaskManager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.js
│   │   │   ├── TaskList.css
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskItem.css
│   │   │   ├── TaskFilter.js
│   │   │   └── TaskFilter.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# For local MongoDB:
# MONGODB_URI=mongodb://localhost:---/taskmanager
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`




## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

## Error Handling

The application includes comprehensive error handling:

- **Server-side**: Validation errors, database errors, and general errors are caught and returned with appropriate HTTP status codes
- **Client-side**: API errors are caught and displayed to the user with clear error messages
- **Validation**: Both client-side and server-side validation ensure data integrity

## Usage

1. **Create a Task**: Fill in the form on the left sidebar and click "Create Task"
2. **Filter Tasks**: Use the filter panel to filter by status and priority
3. **Sort Tasks**: Use the sort options to organize tasks
4. **Update Task**: Click the edit icon (✏️) on any task to modify it
5. **Change Status**: Use the status dropdown on each task to quickly update status
6. **Delete Task**: Click the delete icon (🗑️) to remove a task

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available for use in portfolios and resumes.

