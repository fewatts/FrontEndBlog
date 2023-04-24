import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, CardActions, Grid, CircularProgress } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './ListaTemas.css'
import useLocalStorage from 'react-use-localstorage';
import { getAll } from '../../service/Service';
import { Tema } from '../../models/Tema';

function ListaTemas() {

    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token')
    const navigate = useNavigate()

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
            {temas.length === 0 && (
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '30vh' }}>
                    <Box sx={{ display: 'flex' }} flexDirection={'column'} alignSelf={'center'}>
                        <CircularProgress />
                    </Box>
                </Grid>
            )}
            {temas.map((tema) => (
                <Box m={4}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography color="inherit" gutterBottom>
                                Tema:
                            </Typography>
                            <Typography variant='h5' component='h2'>
                                {tema.descricao}
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
export default ListaTemas;
