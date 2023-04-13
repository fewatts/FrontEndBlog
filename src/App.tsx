import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import Home from './paginas/Home';
import Login from './paginas/Login';
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <NavBar/>
      <div>
      <Routes>
        <Route path='/' element= {<Login/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/home' element= {<Home/>}/>
      </Routes>
      </div>
      <Footer/>
    </ BrowserRouter>
  );
}

export default App;
