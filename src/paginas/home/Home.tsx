import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';
import TabPostagens from '../../components/postagens/TabPostagens';
import useLocalStorage from 'react-use-localstorage';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const [token, setToken] = useLocalStorage('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token === '') {
      navigate('/login')

    }
  }, [])

  function postar() {
    navigate('/cadastrarPostagem')
  }

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
            <Box marginRight={1} display={'flex'} flexDirection={'column'} gap={1}>
              <Button
                onClick={postar}
                variant="outlined"
                className='botao'>
                Postar
              </Button>
              <Link to='/postagens'>
                <Button
                  variant="outlined"
                  className='botao'>
                  Ver Postagens
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} style={{ backgroundColor: 'white' }}>
          <TabPostagens />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
