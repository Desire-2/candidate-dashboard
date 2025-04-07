import { useState, useEffect } from 'react';
import { HiOutlineGlobe, HiOutlineCode } from 'react-icons/hi';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import CandidateForm from './CandidateForm';
import Modal from './Modal';

const COLORS = ['#4ADE80', '#60A5FA', '#A855F7'];

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    tech: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Load/save from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('candidates');
    if (saved) setCandidates(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Filtering logic
  const filteredCandidates = candidates
    .filter(c => {
      const roleMatch = filters.role ? c.role.includes(filters.role) : true;
      const expMatch = filters.experience ? c.experience === filters.experience : true;
      const techMatch = filters.tech ? c.techStack.includes(filters.tech) : true;
      return roleMatch && expMatch && techMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.experience.localeCompare(b.experience);
    });

  // Experience summary data
  const experienceData = filteredCandidates.reduce((acc, c) => {
    acc[c.experience] = (acc[c.experience] || 0) + 1;
    return acc;
  }, {});

  // CSV Export
  const exportCSV = () => {
    const csvContent = [
      ['Name', 'Role', 'Experience', 'Tech Stack'],
      ...filteredCandidates.map(c => [
        c.name,
        c.role,
        c.experience,
        c.techStack.join(', ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates.csv';
    a.click();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Controls Section */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by role"
            className="input input-bordered"
            value={filters.role}
            onChange={e => setFilters({ ...filters, role: e.target.value })}
          />
          <select
            className="select select-bordered"
            value={filters.experience}
            onChange={e => setFilters({ ...filters, experience: e.target.value })}
          >
            <option value="">All Experience</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <button onClick={exportCSV} className="btn btn-primary">
            Export CSV
          </button>
          <div className="flex items-center gap-2">
            <span className="badge badge-success">Junior: {experienceData.Junior || 0}</span>
            <span className="badge badge-info">Mid: {experienceData.Mid || 0}</span>
            <span className="badge badge-warning">Senior: {experienceData.Senior || 0}</span>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.map(candidate => (
          <div 
            key={candidate.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
            onClick={() => setSelectedCandidate(candidate)}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title">{candidate.name}</h2>
                  <p className="text-sm text-gray-500">{candidate.role}</p>
                </div>
                <span className={`badge ${
                  candidate.experience === 'Junior' ? 'badge-success' :
                  candidate.experience === 'Mid' ? 'badge-info' : 'badge-warning'
                }`}>
                  {candidate.experience}
                </span>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href={candidate.linkedin} className="btn btn-sm btn-outline" target="_blank">
                  <HiOutlineGlobe className="w-4 h-4 mr-1" />
                  LinkedIn
                </a>
                <a href={candidate.github} className="btn btn-sm btn-outline" target="_blank">
                  <HiOutlineCode className="w-4 h-4 mr-1" />
                  GitHub
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.techStack.map(tag => (
                  <span 
                    key={tag}
                    className="badge badge-accent badge-outline cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilters({ ...filters, tech: tag });
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <Modal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onSave={updated => {
            setCandidates(candidates.map(c => c.id === updated.id ? updated : c));
            setSelectedCandidate(null);
          }}
          onDelete={() => {
            setCandidates(candidates.filter(c => c.id !== selectedCandidate.id));
            setSelectedCandidate(null);
          }}
        />
      )}

      <CandidateForm 
        onAdd={newCandidate => setCandidates([...candidates, newCandidate])}
      />
    </div>
  );
}