import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastrousuario/CadastroUsuario';
import './App.css';



function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <NavBar />
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </ BrowserRouter>
  );
}

export default App;
