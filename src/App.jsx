import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { DragDropContext } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { RiLayoutGridLine, RiDashboardLine, RiUserAddLine } from 'react-icons/ri';
import CandidateForm from './components/CandidateForm';
import CandidateCard from './components/CandidateCard';
import Controls from './components/Controls';
import ExportButton from './components/ExportButton';
import ExperienceChart from './components/ExperienceChart';
import KanbanBoard from './components/KanbanBoard';
import CandidateModal from './components/CandidateModal';
import './App.css';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    experience: '',
    tech: '',
    sortBy: 'name'
  });
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showForm, setShowForm] = useState(false);

  // Load/save candidates
  useEffect(() => {
    const saved = localStorage.getItem('candidates');
    if (saved) setCandidates(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  // Candidate operations
  const handleAddCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
    setShowForm(false);
  };

  const handleUpdateCandidate = (updatedCandidate) => {
    setCandidates(candidates.map(c => 
      c.id === updatedCandidate.id ? updatedCandidate : c
    ));
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  // Filtering and sorting
  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.role.toLowerCase().includes(filters.search.toLowerCase());
      const matchesExp = filters.experience ? 
        candidate.experience === filters.experience : true;
      const matchesTech = filters.tech ?
        candidate.techStack.includes(filters.tech) : true;
      return matchesSearch && matchesExp && matchesTech;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      return a.experience.localeCompare(b.experience);
    });

  // Drag and drop handler
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(candidates);
    const [reorderedItem] = items.splice(result.source.index, 1);
    const updatedItem = { 
      ...reorderedItem, 
      experience: result.destination.droppableId 
    };
    
    items.splice(result.destination.index, 0, updatedItem);
    setCandidates(items);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 animate-gradient-x">
      <div className="container mx-auto p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse delay-100" />
        </div>

        {/* Main Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 mt-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Talent Nexus
          </h1>
          <p className="text-lg mt-2 text-slate-300 font-light">
            Smart Candidate Management System
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative space-y-8"
        >
          {/* Floating Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="fixed bottom-8 right-8 z-50 p-4 bg-blue-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <RiUserAddLine className="w-6 h-6 text-white" />
          </motion.button>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40"
              >
                <div className="bg-slate-800/90 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
                  <CandidateForm 
                    onAdd={handleAddCandidate}
                    onClose={() => setShowForm(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dashboard Controls */}
          <div className="grid lg:grid-cols-3 gap-8  mobile-scale">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <Controls 
                  filters={filters} 
                  setFilters={setFilters} 
                  onTechFilterClear={() => setFilters({...filters, tech: ''})}
                />
              </div>
              
              <div className="flex items-center gap-4 justify-between">
                <ExportButton onClick={exportCSV} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500/30 text-blue-400' 
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <RiLayoutGridLine />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      viewMode === 'kanban' 
                        ? 'bg-purple-500/30 text-purple-400' 
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <RiDashboardLine />
                    Kanban
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <ExperienceChart candidates={candidates} />
            </div>
          </div>

          {/* Active Filters */}
          {filters.tech && (
            <div className="bg-slate-800/50 p-3 rounded-lg backdrop-blur-sm">
              <span className="text-sm text-slate-300">
                Active Tech Filter: 
                <span className="ml-2 badge badge-accent">
                  {filters.tech}
                  <button 
                    className="ml-2 text-xs"
                    onClick={() => setFilters({...filters, tech: ''})}
                  >
                    ×
                  </button>
                </span>
              </span>
            </div>
          )}

          {/* Candidate Display Area */}
          {viewMode === 'grid' ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CandidateCard 
                      candidate={candidate}
                      onEdit={setEditingCandidate}
                      onDelete={handleDeleteCandidate}
                      onTechFilter={(tech) => setFilters({...filters, tech})}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <KanbanBoard 
                  candidates={filteredCandidates}
                  onEdit={setEditingCandidate}
                  onDelete={handleDeleteCandidate}
                  onTechFilter={(tech) => setFilters({...filters, tech})}
                />
              </motion.div>
            </DragDropContext>
          )}
        </motion.div>

        {/* Edit Modal */}
        <AnimatePresence>
          {editingCandidate && (
            <CandidateModal
              candidate={editingCandidate}
              onClose={() => setEditingCandidate(null)}
              onSave={handleUpdateCandidate}
              onDelete={() => {
                handleDeleteCandidate(editingCandidate.id);
                setEditingCandidate(null);
              }}
            />
          )}
        </AnimatePresence>

        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.9)',
            color: '#fff',
            backdropFilter: 'blur(10px)'
          }
        }} />
      </div>
    </div>
  );
}
