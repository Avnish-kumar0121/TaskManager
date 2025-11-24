import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (taskData) => {
    const success = await onUpdate(editingTask._id, taskData);
    if (success) {
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#2196f3';
      default:
        return '#ff9800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks ({tasks.length})</h2>
      </div>

      {editingTask && (
        <div className="edit-task-overlay">
          <div className="edit-task-modal">
            <TaskForm
              initialTask={editingTask}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      <div className="task-items">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

