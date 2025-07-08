const FilterPanel = ({ categories, selected, onChange }) => (
  <select value={selected} onChange={e => onChange(e.target.value)}>
    <option value="">All Categories</option>
    {categories.map(cat => <option key={cat}>{cat}</option>)}
  </select>
);
export default FilterPanel;
