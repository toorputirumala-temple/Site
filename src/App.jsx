
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index/>}></Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
