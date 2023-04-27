import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../src/models/Tema'
import { getId, post, put } from '../../../src/service/Service'
import { Card, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokenReducer'
import { toast } from 'react-toastify'

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
      toast.error('Não autorizado!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
        toast.success('Tema atualizado!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history('/temas')
      } catch (error) {
        toast.error('Falha ao atualizar tema...', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      try {
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Tema cadastrado!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history('/temas')
      } catch (error) {
        toast.error('Erro ao cadastrar tema...', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }

  return (
    <>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundColor: 'var(--white)'}}>
        <Card variant='elevation' style={{ boxSizing: 'content-box', boxShadow: '18px 6px 10px 0px rgba(0,0,0,0.52)', borderRadius:'11px 11px 11px 11px' }}>
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
