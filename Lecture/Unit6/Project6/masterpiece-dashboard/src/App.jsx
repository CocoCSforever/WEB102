import { useState } from 'react'
import './App.css'
import SideNav from './components/SideNav'
import Dashboard from './pages/Dashboard'

function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");


  return (
    <>
      <div className="app-container">
        <SideNav activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="content">
          {activeSection === "Dashboard" && <Dashboard />}
          {/* {activeSection === "Search" && <p>Use the search feature to find what you need.</p>} */}
          {activeSection === "About" && <p>This app provides objects on display in Cooper Hewitt, Smithsonian Design Museum Collections</p>}
        </div>
      </div>
    </>
  )
}

export default App
