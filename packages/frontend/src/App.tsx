import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { 
  HomePage,
  NavBar,
  Login,
  Learning,
  Signup,
  Account
} from './components/index'
import { UserProvider } from './contexts/UserContext'

function App() {

  return (
    <>
    <UserProvider>
      <Router> 
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/learning" element={<Learning/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/account" element={<Account/>}/>
        </Routes>
      </Router>
      </UserProvider>
    </>
  )
}

export default App
