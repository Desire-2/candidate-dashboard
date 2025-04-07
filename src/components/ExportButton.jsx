export default function ExportButton({ onClick }) {
    return (
      <button 
        onClick={onClick}
        className="btn btn-success gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m-4 17H7v-2h3v2m0-3H7v-2h3v2m0-3H7v-2h3v2m4 6h-3v-2h3v2m0-3h-3v-2h3v2m0-3h-3v-2h3v2m-1-4V3.5L18.5 9H13z"/>
        </svg>
        Export CSV
      </button>
    )
  }