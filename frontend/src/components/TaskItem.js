import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onUpdate, onDelete, getStatusColor, getPriorityColor }) => {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await onUpdate(task._id, { ...task, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-item-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-badges">
          <span
            className="badge status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status.replace('-', ' ')}
          </span>
          <span
            className="badge priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-item-footer">
        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue() ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
              {isOverdue() && ' (Overdue)'}
            </span>
          )}
          <span className="task-created">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>

        <div className="task-actions">
          <select
            value={task.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="status-select"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => onEdit(task)}
            className="btn-icon btn-edit"
            title="Edit task"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn-icon btn-delete"
            title="Delete task"
          >
            {deleting ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

