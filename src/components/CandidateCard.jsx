import { motion } from 'framer-motion'
import { GlobeAltIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

export default function CandidateCard({ candidate }) {
  const experienceColors = {
    Junior: 'bg-green-500',
    Mid: 'bg-blue-500',
    Senior: 'bg-purple-500'
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
    >
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className={`avatar placeholder ${experienceColors[candidate.experience]}`}>
            <div className="text-white rounded-full w-12">
              <span>{candidate.name[0]}</span>
            </div>
          </div>
          <div>
            <h2 className="card-title">{candidate.name}</h2>
            <p className="text-sm opacity-75">{candidate.role}</p>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <a href={candidate.linkedin} target="_blank" className="btn btn-sm btn-ghost">
            <GlobeAltIcon className="w-4 h-4" />
            LinkedIn
          </a>
          <a href={candidate.github} target="_blank" className="btn btn-sm btn-ghost">
            <CodeBracketIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {candidate.techStack.map(tag => (
            <span key={tag} className="badge badge-outline badge-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}