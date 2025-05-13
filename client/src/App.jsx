import { useEffect, useState } from 'react'
import { useThemeStore } from './store/useThemeStore.js'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from '../src/pages/Home.jsx'
function App() {
const {theme} = useThemeStore()
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
  },[theme])

  return (
<div>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
  </Routes>
  <Toaster/>
  </BrowserRouter>
</div>
  )
}

export default App
