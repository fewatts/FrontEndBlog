import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import Home from './paginas/Home';
import { useState } from 'react';
import './App.css';



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar/>
      <Home/>
      <Footer/>
    </>
  );
}

export default App
