import Footer from './components/estaticos/footer/Footer';
import NavBar from './components/estaticos/navbar/NavBar';
import ListaTemas from './components/temas/ListaTemas';
import ListaPostagens from './components/postagens/ListaPostagens';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastrousuario/CadastroUsuario';
import CadastroTema from './components/temas/CadastroTema'
import './App.css';



function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{minHeight: '85vh'}}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario />} />
          <Route path='/home' element={<Home />} />
          <Route path='/temas' element={<ListaTemas />} />
          <Route path='/postagens' element={<ListaPostagens />} />
          <Route path='/cadastrarTema' element={<CadastroTema />} />
          <Route path='/editarTema/:id' element={<CadastroTema />} />
          {/* <Route path='/deletarTema/:id' element={<DeletarTema />} />  */}
        </Routes>
      </div>
      <Footer />
    </ BrowserRouter>
  );
}

export default App;
