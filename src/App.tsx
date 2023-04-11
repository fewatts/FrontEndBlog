import { useState } from 'react'
import './App.css'
import NavBar from './components/navbar/NavBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <h1>Hallo welt</h1>
      <h2>Wie heiBe du?</h2>
      <NavBar/>
      
    </>
  )
}

export default App
