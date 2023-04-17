import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';

function Home() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className='caixa'
      >
        <Grid item xs={6}>
          <img
            src="https://i.imgur.com/Waz7fBM.png"
            alt=""
            className='fthome'
          />
        </Grid>
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}  >
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="p"
              align="center"
              className='titulo'>

              Seja bem vinde!

            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className='titulo'>

              Poste suas experiências com a música e mixagem aqui!

            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button
              variant="outlined"
              className='botao'>

              Ver Postagens

            </Button>
          </Box>
        </Grid>
        <Grid xs={12} style={{ backgroundColor: 'white' }}></Grid>
      </Grid>
    </>
  );
}

export default Home;
