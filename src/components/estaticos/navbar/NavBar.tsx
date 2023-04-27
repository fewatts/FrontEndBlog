import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import useLocalStorage from 'react-use-localstorage';
import { useSelector, useDispatch } from 'react-redux';
import { TokenState } from '../../../store/tokenReducer';
import { addToken } from '../../../store/tokens/action';
import { toast } from 'react-toastify';


function NavBar() {

  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
  )
  const dispatch = useDispatch();
  const history = useNavigate()

  function goLogout() {
    toast.success('Usuário deslogado', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    dispatch(addToken(''))
    history('/login')
  }

  var navbarComponent;

  if (token !== '') {
    navbarComponent = <AppBar position="static" style={{ background: 'var(--background)' }} className='navbar'>
      <Toolbar variant="dense" >
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
          <Box className='cursor'>
            <Link to='/home'>
              <Typography variant="h5" color="inherit">
                <strong>DJ's</strong>
              </Typography>
            </Link>
          </Box>
          <Box display="flex" justifyContent="start">
            <Box mx={1} className='cursor'>
              <Link to='/home'>
                <Typography variant="h6" color="inherit">
                  home
                </Typography>
              </Link>
            </Box>
            <Box mx={1} className='cursor'>
              <Link to='/postagens'>
                <Typography variant="h6" color="inherit">
                  postagens
                </Typography>
              </Link>
            </Box>
            <Box mx={1} className='cursor'>
              <Link to='/temas'>
                <Typography variant="h6" color="inherit">
                  temas
                </Typography>
              </Link>
            </Box>
            <Box mx={1} className='cursor'>
              <Link to='/cadastrarTema'>
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
              </Link>
            </Box>
            <Box mx={1} className='cursor'>
              <Link to='/perfil'>
                <Typography variant="h6" color="inherit">
                  Perfil
                </Typography>
              </Link>
            </Box>
            <Box mx={1} className='cursor'>
              <Button variant="outlined" color="inherit" size="small" onClick={goLogout}>
                <Typography color="inherit">
                  logout
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>

  )
}

export default NavBar;
