import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './ListaTemas.css'

function ListaTemas() {
    return (
        <>
            <Box m={2}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography color="inherit" gutterBottom>
                            Tema:
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            Descrição do tema
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' style={{backgroundColor: 'var(--blue)'}} size='small' className='bottem'>Editar</Button>
                        <Button color='secondary' style={{backgroundColor: 'var(--red)'}} variant='contained' size='small'>Deletar</Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default ListaTemas;
