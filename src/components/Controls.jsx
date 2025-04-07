export default function Controls({ filters, setFilters }) {
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or role"
          className="input input-bordered flex-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        
        <select 
          className="select select-bordered"
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
        >
          <option value="">All Experience</option>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
        
        <select 
          className="select select-bordered"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="name">Sort by Name</option>
          <option value="experience">Sort by Experience</option>
        </select>
      </div>
    )
  }