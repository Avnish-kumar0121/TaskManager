import React from 'react';
import './TaskFilter.css';

const TaskFilter = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      priority: '',
      sortBy: 'createdAt',
      order: 'desc'
    });
  };

  const hasActiveFilters = filters.status || filters.priority;

  return (
    <div className="task-filter-card">
      <div className="filter-header">
        <h2>Filters & Sort</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear
          </button>
        )}
      </div>

      <div className="filter-group">
        <label htmlFor="filter-status">Status</label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-priority">Priority</label>
        <select
          id="filter-priority"
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort By</label>
        <select
          id="sort-by"
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-order">Order</label>
        <select
          id="sort-order"
          value={filters.order}
          onChange={(e) => handleChange('order', e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;

