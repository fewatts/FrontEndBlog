import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(){
    return(
        <>
        <AppBar position="static" style={{background: 'var(--background)'}} className='navbar'>
          <Toolbar variant="dense" >
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
              <Box className='cursor'>
                <Typography variant="h5" color="inherit">
                  <strong>Blog DJ's</strong>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="start">
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Box>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </Box>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    temas
                  </Typography>
                </Box>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    cadastrar tema
                  </Typography>
                </Box>
                <Box mx={1} className='cursor'>
                <Link to='/'><Button variant="outlined" color="inherit" size="small">
                <Typography color="inherit">
                    logout
                  </Typography>                
                </Button></Link>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
}

export default NavBar
