import React from "react";

const FilterPanel = ({ categories, selected, onChange }) => (
  <div className="my-4">
    <label htmlFor="category" className="block mb-1 text-white font-semibold">
      Filter by Category
    </label>
    <select
      id="category"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default FilterPanel;

