import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography, Link } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteId, getId } from '../../service/Service';
import { Postagem } from '../../models/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokenReducer';
import { toast } from 'react-toastify';

function DeletarTema() {

    const history = useNavigate();

    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const { id } = useParams<{ id: string }>()

    const [postagem, setPostagem] = useState<Postagem>();

    async function getPostagemById(id: string) {
        await getId(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            getPostagemById(id)
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

    function sim() {
        toast.success('Postagem excluída!', {
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
        deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        })
    }

    function nao() {
        history('/postagens')
    }


    return (
        <>
            <Box m={4}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography color="inherit" gutterBottom>
                            Excluir Postagem?
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {postagem?.titulo}
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {postagem?.texto}
                        </Typography>
                        <Typography variant='body1' component='p'>
                            <a href={postagem?.link} target='_blank'>Set SoundCloud</a>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={sim} variant='contained' style={{ backgroundColor: 'var(--blue)' }} size='small' className='bottem'>Sim</Button>
                        <Button onClick={nao} color='secondary' style={{ backgroundColor: 'var(--red)' }} variant='contained' size='small'>Não</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarTema;
