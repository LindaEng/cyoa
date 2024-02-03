import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/index'

function App() {
  

  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
