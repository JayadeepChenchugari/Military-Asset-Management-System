import React from 'react';
import './Filter.css';

const Filter = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <input
        type="date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Base"
        value={filters.base}
        onChange={(e) => setFilters({ ...filters, base: e.target.value })}
      />
      <input
        type="text"
        placeholder="Equipment Type"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      />
    </div>
  );
};

export default Filter;
