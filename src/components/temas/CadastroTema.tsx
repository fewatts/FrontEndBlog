import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../src/models/Tema'
import { getId, post, put } from '../../../src/service/Service'
import { Card, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokenReducer'

function CadastroTema() {

  const history = useNavigate();
  const token = useSelector<TokenState, TokenState['token']>(
    (state) => state.token
)

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
  }, [id])

  useEffect(() => {
    if (token === '') {
      alert('Não autorizado!');
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
        alert('ERROR');
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
        alert('ERROR');
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
                className='textos1'
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
                disabled={tema.descricao.length < 3}
                type='submit'
                size='medium'
                variant='contained'
                style={{ backgroundColor: 'var(--blue)' }}>
                {tema.id !== 0 ? 'Editar' : 'Cadastrar'}
              </Button>
              <Link to='/temas'>
                <Button
                  type='submit'
                  size='medium'
                  variant='contained'
                  fullWidth
                  style={{ backgroundColor: 'var(--red)' }}
                >Cancelar</Button>
              </Link>
            </Box>
          </form>
        </Card>
      </Grid>
    </>
  )
}

export default CadastroTema
