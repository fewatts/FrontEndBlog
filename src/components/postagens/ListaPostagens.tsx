import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ListaPostagens() {
    return (
        <>
            <Box m={2}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography color="inherit" gutterBottom>
                            Postagens:
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            Título da postagem
                        </Typography>
                        <Typography variant='body1' component='p'>
                            Texto da postagem
                        </Typography>
                        <Typography variant='body1' component='p'>
                            Tema
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color='primary'style={{backgroundColor: 'var(--blue)'}} variant='contained' size='small'>Editar</Button>
                        <Button color='secondary' style={{backgroundColor: 'var(--red)'}} variant='contained' size='small'>Deletar</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default ListaPostagens;
