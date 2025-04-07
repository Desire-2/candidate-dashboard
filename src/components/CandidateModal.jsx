import { useRef } from 'react'
import { GlobeAltIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

export default function CandidateModal({ candidate, onClose, onSave }) {
  const modalRef = useRef(null)
  
  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-200">
        <h3 className="font-bold text-2xl mb-4">{candidate.name}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg"><strong>Role:</strong> {candidate.role}</p>
            <p className="badge badge-primary">{candidate.experience}</p>
          </div>
          <div className="space-y-2">
            <a href={candidate.linkedin} className="btn btn-sm btn-outline">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
            <a href={candidate.github} className="btn btn-sm btn-outline">
              <CodeBracketIcon className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-wrap gap-2 mb-4">
          {candidate.techStack.map(tag => (
            <span key={tag} className="badge badge-accent">{tag}</span>
          ))}
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}