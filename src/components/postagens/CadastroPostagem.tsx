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
import { toast } from 'react-toastify'

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
    const [usuario, setusuario] = useState<Usuario>({
        id: +userId,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
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
            toast.warn('Efetue o login!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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
                toast.success('Postagem atualizada!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                history('/home')
            } catch (error) {
                toast.error('Falha ao atualizar postagem', {
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
                await post('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toast.success('Postagem cadastrada!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                history('/home')
            } catch (error) {
                toast.error('Falha ao cadastrar postagem...', {
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
                        <Box display={'flex'} flexDirection={'column'} gap={2}>
                            <Typography variant="h6"
                                gutterBottom
                                color="textPrimary"
                                component="h6"
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
                                disabled={postagem.texto.length < 10 && tema.id === 0}
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
