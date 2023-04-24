import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { Tema } from '../../../src/models/Tema'
import { getId, post, put } from '../../../src/service/Service'
import { Card, Grid, Typography } from '@material-ui/core';

function CadastroTema() {

  const history = useNavigate();
  const [token, setToken] = useLocalStorage('token');

  const { id } = useParams<{ id: string }>()

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value,
    });
  }

  async function getTemaById(id: string) {
    await getId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    if (id !== undefined) {
      getTemaById(id)
    }
  })

  useEffect(() => {
    if (token === '') {
      alert('Sem token não né meu bom');
      history('/login');
    }
  }, []);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema atualizado com sucesso');
        history('/temas')
      } catch (error) {
        alert('Deu ruim');
      }
    } else {
      try {
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert('Tema cadastrado com sucesso');
        history('/temas')
      } catch (error) {
        alert('Deu ruim');
      }
    }
  }


  return (
    <>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}>
        <Card variant='outlined'>
          <form onSubmit={onSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Typography
                variant="h5"
                gutterBottom
                color="textPrimary"
                component="h5"
                align="center"
              >
                <strong>{tema.id !== 0 ? 'Editar tema' : 'Cadastrar tema'}</strong>
              </Typography>

              <TextField
                label='Descrição do tema'
                name='descricao'
                value={tema.descricao}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
              />

              <Button
                disabled={tema.descricao.length > 3}
                type='submit'
                size='medium'
                variant='contained'
                style={{ backgroundColor: 'var(--blue)' }}
              >
                {tema.id !== 0 ? 'Editar' : 'Cadastrar'}
              </Button>
              <Button
                type='submit'
                size='medium'
                variant='contained'
                style={{ backgroundColor: 'var(--red)' }}
              >Deletar</Button>
            </Box>
          </form>
        </Card>
      </Grid>
    </>
  )
}

export default CadastroTema
