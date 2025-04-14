import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SidebarLayout from './components/SidebarLayout'
import Home from './components/Home'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateGallery from './components/CrewmateGallery'
import EditCrewmate from './components/EditCrewmate'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="/createcrewmate" element={<CreateCrewmate />} />
          <Route path="/crewmategallery" element={<CrewmateGallery />} />
          <Route path="/editcrewmate/:id" element={<EditCrewmate />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
