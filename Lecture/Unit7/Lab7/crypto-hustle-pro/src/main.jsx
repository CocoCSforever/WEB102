import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from '../routes/Layout.jsx'
import DetailView from '../routes/DetailView.jsx'
import { Link } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="/coinDetail/:symbol" element={<DetailView />} />
        </Route>
        <Route path="*" element={
          <div>
          <p>There is nothing here.</p>
          <Link style={{ color: "white" }} to="/">
            Back to Home
          </Link>
          </div>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
