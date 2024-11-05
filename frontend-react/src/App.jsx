import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import './index.css'
import User from './pages/User'
import ViewReport from './pages/ViewReport'
import CreateReport from './pages/CreateReport'

function App() {

  return (
    <>
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/user' element={<User/>}/>
        <Route path='/doctor' element={<User/>}/>
        <Route path='/report' element={<ViewReport/>}/>
        <Route path='/create' element={<CreateReport/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App