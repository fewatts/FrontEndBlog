import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Postagem } from '../../models/Postagem';
import useLocalStorage from 'react-use-localstorage';
import { getAll } from '../../service/Service';
import { Tema } from '../../models/Tema';

function ListaPostagens() {

    const [postagens, setPostagens] = useState<Postagem[]>([])
    const [token, setToken] = useLocalStorage('token')
    const navigate = useNavigate()

    async function getAllPostagens() {
        await getAll('/postagens', setPostagens, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllPostagens()
    }, [])

    const [temas, setTemas] = useState<Tema[]>([])

    async function getAllTemas() {
        await getAll('/temas', setTemas, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllTemas()
    }, [])

    useEffect(() => {
        if (token === '') {
            alert('Não autorizado!')
            navigate('/login')
        }
    }, [])

    return (
        <>
            {postagens.map((postagem) => (
                <Box m={2}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h5' component='h2' >
                                <strong>{postagem.titulo}</strong>
                            </Typography>
                            <Typography variant='h5' component='p'>
                                {postagem.tema.descricao}
                            </Typography>
                            <Typography variant='body1' component='p'>
                                {postagem.texto}
                            </Typography>
                            <Typography variant='body1' component='p'>
                                <a href={postagem.link} target='_blank'>Set SoundCloud</a>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' style={{ backgroundColor: 'var(--blue)' }} size='small' className='bottem'>Editar</Button>
                            <Button color='secondary' style={{ backgroundColor: 'var(--red)' }} variant='contained' size='small'>Deletar</Button>
                        </CardActions>
                    </Card>
                </Box>
            ))}
        </>
    );
}
export default ListaPostagens;
