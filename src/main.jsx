import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Route,Routes, BrowserRouter } from 'react-router-dom'
import User from './getUser/User'
import AddUser from './addUser/AddUser'
import Update from './updateUser/Update'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Toaster/>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
