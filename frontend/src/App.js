import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc'
  });

  // Fetch tasks when filters change or on mount
  useEffect(() => {
    fetchTasks();
  }, [filters.status, filters.priority, filters.sortBy, filters.order]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(filters);
      // Handle response format from backend
      const tasksArray = Array.isArray(data) ? data : (data?.data || []);
      setTasks(tasksArray);
      setFilteredTasks(tasksArray);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setError(null);
    try {
      const response = await createTask(taskData);
      const newTask = response.data || response;
      setTasks([...tasks, newTask]);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to create task');
      return false;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    setError(null);
    try {
      const response = await updateTask(id, taskData);
      const updatedTask = response.data || response;
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      return false;
    }
  };

  const handleDeleteTask = async (id) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      return false;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Task Management System</h1>
          <p>Organize your tasks efficiently</p>
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="main-content">
          <div className="sidebar">
            <TaskForm onSubmit={handleCreateTask} />
            <TaskFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="content">
            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

