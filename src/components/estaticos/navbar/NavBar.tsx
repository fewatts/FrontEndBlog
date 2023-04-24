import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import useLocalStorage from 'react-use-localstorage';

function NavBar() {

  const [token, setToken] = useLocalStorage('token');
  const navigate = useNavigate();

  function logout() {
    setToken('');
    alert('Logout concluído!')
    navigate('/login')
  }

  return (
    <>
      <AppBar position="static" style={{ background: 'var(--background)' }} className='navbar'>
        <Toolbar variant="dense" >
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
            <Box className='cursor'>
              <Link to='/home'>
                <Typography variant="h5" color="inherit">
                  <strong>Blog DJ's</strong>
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
                <Button variant="outlined" color="inherit" size="small" onClick={logout}>
                  <Typography color="inherit">
                    logout
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar
