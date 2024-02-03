import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { 
  HomePage,
  NavBar,
  Login,
  Learning,
  Signup,
} from './components/index'

function App() {
  

  return (
    <>
      <Router> 
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/learning" element={<Learning/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
