import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, CardActions, Grid, CircularProgress } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './ListaTemas.css'
import { getAll } from '../../service/Service';
import { Tema } from '../../models/Tema';
import DeletarTema from './DeletarTema';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokenReducer';

function ListaTemas() {

    const [temas, setTemas] = useState<Tema[]>([]);
    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )
    
    const history = useNavigate();

    async function getAllTemas() {
        await getAll('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        getAllTemas();
    }, [temas.length]);

    useEffect(() => {
        if (token === '') {
            alert('Não autorizado!');
            history('/login');
        }
    }, [token]);


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
                            <Link to={`/editarTema/${tema.id}`}>
                                <Button variant='contained' style={{ backgroundColor: 'var(--blue)' }} size='small' className='bottem'>Editar</Button>
                            </Link>
                            <Link to={`/deletarTema/${tema.id}`}>
                                <Button color='secondary' style={{ backgroundColor: 'var(--red)' }} variant='contained' size='small'>Deletar</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Box>
            ))}
        </>
    );
}
export default ListaTemas;
