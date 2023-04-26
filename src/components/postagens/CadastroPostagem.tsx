import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Postagem } from '../../../src/models/Postagem'
import { getAll, getId, post, put } from '../../../src/service/Service'
import { Card, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { Tema } from '../../models/Tema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokenReducer'
import { Usuario } from '../../models/Usuario'

function CadastroPostagem() {

    const history = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )
    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )
    const[usuario, setusuario] = useState<Usuario>({
        id: +userId,
        nome:'',
        usuario:'',
        senha:'',
        foto:''
    })

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        }
    )

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        link: '',
        tema: null,
        usuario: null
    })

    useEffect(() => {
        if (token === '') {
            alert("Efetue o login")
            history("/login")

        }
    }, [token])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            getByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await getAll("/temas", setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    async function getByIdPostagem(id: string) {
        await getId(`postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    function updateModel(event: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })

    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id !== undefined) {
            try {
                await put('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem atualizada com sucesso');
                history('/home')
            } catch (error) {
                alert('Falha ao atualizar postagem');
            }
        } else {
            try {
                await post('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem cadastrada com sucesso');
                history('/home')
            } catch (error) {
                alert('Falha ao cadastrar postagem');
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
                        <Typography variant="h5"
                                gutterBottom
                                color="textPrimary"
                                component="h5"
                                align="center"
                                className='textos1'><strong>{postagem.id !== 0 ? 'Editar postagem' : 'Cadastrar postagem'}</strong></Typography>                             
                            <TextField
                                label='Título'
                                name='titulo'
                                value={postagem.titulo}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                            />

                            <TextField
                                label='texto'
                                name='texto'
                                value={postagem.texto}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                            />

                            <TextField
                                label='link'
                                name='link'
                                value={postagem.link}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                            />
                            <InputLabel id="demo-simple-select-helper-label"><strong>Escolha um tema:</strong></InputLabel>
                            <Select 
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={(event) => getId(`/temas/${event.target.value}`, setTema, {
                                    headers: {
                                        Authorization: token
                                    }
                                })}>
                                {
                                    temas.map(tema => (
                                        <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                                    ))
                                }
                            </Select>
                            
                            <Button
                                disabled={postagem.texto.length < 10}
                                type='submit'
                                size='medium'
                                variant='contained'
                                style={{ backgroundColor: 'var(--blue)' }}>
                                {postagem.id !== 0 ? 'Editar' : 'Postar'}
                            </Button>
                            <Link to='/postagens'>
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

export default CadastroPostagem
