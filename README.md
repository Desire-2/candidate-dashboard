# Candidate Portfolio Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-06B6D4)](https://tailwindcss.com/)

A modern dashboard for HR teams to manage developer candidates with advanced filtering, sorting, and visualization features.

![Dashboard Preview]((https://github.com/Desire-2/candidate-dashboard/blob/main/src/assets/Screenshot%202025-04-07%20030358.png?text=Dashboard+Preview)

## Features

### Core Functionality
- **Candidate Management**
  - Add candidates with detailed profiles
  - Edit/delete existing candidates
  - LocalStorage persistence
- **Dashboard View**
  - Grid/Kanban layout toggle
  - Candidate cards with:
    - Social media links (GitHub/LinkedIn)
    - Experience level badges
    - Tech stack tags
- **Filtering & Sorting**
  - Search by name/role
  - Filter by experience level/tech stack
  - Sort by name or experience

### Bonus Features
- 📊 Experience distribution pie chart
- 📥 CSV export functionality
- 🎨 Dark mode with glassmorphism effects
- ✨ Drag-and-drop Kanban board
- 📱 Fully responsive design

## Tech Stack

- **Frontend**:  
  ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwind-css)
  ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF)

- **Utilities**:  
  ![React Icons](https://img.shields.io/badge/-React_Icons-FF4154)
  ![UUID](https://img.shields.io/badge/-UUID-FF6B6B)
  ![Recharts](https://img.shields.io/badge/-Recharts-FF6B6B)

## Installation

1. ## Clone the repository:
```
https://github.com/Desire-2/candidate-dashboard
```

Install dependencies:

bash
```
cd candidate-dashboard
npm install
```
2. ## Start development server:
```
npm run dev
```
## Usage
Adding Candidates
Click the floating ➕ button

Fill in all required fields

Add tech stack tags with Enter/Add button

Submit to save to LocalStorage

## Using Filters
Search box: Filter by name/role

Experience dropdown: Select Junior/Mid/Senior

Click tech tags to filter by specific technology

## Advanced Features
Export Data: Click "Export CSV" to download all candidates

Kanban View: Drag candidates between experience columns

Edit Mode: Click pencil icon on any candidate card

## Contributing
Contributions are welcome! Please follow these steps:

## Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add some AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

## Acknowledgments
UI Inspiration: [Glassmorphism Design Trends]

Drag-and-Drop: [React Beautiful DnD]

Icons: [Remix Icon]

