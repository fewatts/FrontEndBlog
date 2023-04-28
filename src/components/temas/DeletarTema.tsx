import React, { ChangeEvent, useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography, Link } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Tema } from '../../models/Tema';
import { deleteId, getAll, getId } from '../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokenReducer';
import { toast } from 'react-toastify';
import { Postagem } from '../../models/Postagem';

function DeletarTema() {

    const history = useNavigate();
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const [tema, setTema] = useState<Tema>({
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

    async function ListaPostagem() {
        await getAll('/postagens', setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        ListaPostagem()
    }, [])


    const { id } = useParams<{ id: string }>()


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

    function sim() {
        toast.success('Tema excluído!', {
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
        deleteId(`/temas/${id}`, {
            headers: {
                'Authorization': token
            }
        })
    }

    function nao() {
        history('/temas')
    }


    return (
        <>
            <Box m={4}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography color="inherit" gutterBottom>
                            Excluir tema? 
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {tema?.descricao}
                        </Typography>
                    </CardContent>
                    {tema?.postagem?.length === 0 && (
                        <CardActions>
                            <Button onClick={sim} variant='contained' style={{ backgroundColor: 'var(--blue)' }} size='small' className='bottem'>Sim</Button>
                            <Button onClick={nao} color='secondary' style={{ backgroundColor: 'var(--red)' }} variant='contained' size='small'>Não</Button>
                        </CardActions>
                    )}
                    <CardContent>
                        <Typography variant='h5' component='h2'>
                            {tema?.postagem?.length === 0 ? '' : 'Só temas sem postagens podem ser apagados...'}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
export default DeletarTema;
