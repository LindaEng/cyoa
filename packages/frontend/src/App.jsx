import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { 
  HomePage,
  NavBar,
  Login,
  LearningPlan,
  LearningHome,
  Signup,
  Account,
  Playground
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
          <Route path="/learning" element={<LearningHome/>} />
          <Route path="/learning/new" element={<LearningPlan/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/account" element={<Account/>}/>
          <Route path="/playground" element={<Playground/>} />
        </Routes>
      </Router>
      </UserProvider>
    </>
  )
}

export default App
