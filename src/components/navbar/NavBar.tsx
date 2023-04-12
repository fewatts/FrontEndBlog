import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';

function NavBar(){
    return(
        <>
        <AppBar position="static" style={{background: 'var(--background)'}}>
          <Toolbar variant="dense" >
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >
              <Box style={{ cursor: 'pointer' }}>
                <Typography variant="h5" color="inherit">
                  <strong>Blog DJ's</strong>
                </Typography>
              </Box>
  
              <Box display="flex" justifyContent="start">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Box>
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </Box>
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    temas
                  </Typography>
                </Box>
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    cadastrar tema
                  </Typography>
                </Box>
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    logout
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
}

export default NavBar
