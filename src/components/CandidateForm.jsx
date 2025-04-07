import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CandidateForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedin: '',
    github: '',
    experience: 'Junior',
    techStack: []
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      ...formData,
      id: uuidv4(),
      techStack: [...formData.techStack]
    };
    onAdd(newCandidate);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      linkedin: '',
      github: '',
      experience: 'Junior',
      techStack: []
    });
    setCurrentTag('');
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.techStack.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  return (
    <div className="card bg-base-200 shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Job Role</span>
            </label>
            <input
              type="text"
              placeholder="Senior React Developer"
              className="input input-bordered"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">LinkedIn URL</span>
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="input input-bordered"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">GitHub URL</span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              className="input input-bordered"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Experience Level</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tech Stack</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.techStack.map(tag => (
                <span key={tag} className="badge badge-primary gap-2">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      techStack: formData.techStack.filter(t => t !== tag)
                    })}
                    className="text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="join">
              <input
                type="text"
                placeholder="Add technology (press Enter)"
                className="input input-bordered join-item flex-1"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-primary join-item"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Candidate
        </button>
      </form>
    </div>
  );
}