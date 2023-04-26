import React, { useEffect } from 'react';
import './Cadastrousuario.css';
import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../service/Service';
import './Cadastrousuario.css';

function CadastroUsuario() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: ''
    });

    const [usuarioResult, setUsuarioResult] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: ''
    });

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(event.target.value);
    }

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if (confirmarSenha == usuario.senha) {
            try {
                await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuarioResult)
                alert('Usuário cadastrado!')
            } catch (error) {
                alert('Verifique o formulário corretamente')
            }
        } else {
            alert('As senhas estão diferentes')
            setConfirmarSenha('')
            setUsuario({
                ...usuario,
                senha: ''
            })
        }
    }

    useEffect(() => {
        if (usuario.id !== 0) {
            navigate("/login")
        }
    }, [usuario.id])

    return (
        <>
            <Grid container alignItems='center' justifyContent='center' className='background'>
                <Grid xs={6} className='imgcad'></Grid>
                <Grid item xs={6} alignItems='center'>
                    <Box padding={10}>
                        <form onSubmit={onSubmit}>
                            <Typography variant="h5"
                                gutterBottom
                                color="textPrimary"
                                component="h5"
                                align="center"
                                className='textos1'>Cadastrar</Typography>
                            <TextField
                                required
                                value={usuario.nome}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='nome'
                                name='nome'
                                margin='normal'
                                fullWidth />
                            <TextField
                                required
                                value={usuario.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='usuario'
                                name='usuario'
                                margin='normal'
                                fullWidth />
                            <TextField
                                required
                                value={usuario.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='senha'
                                name='senha'
                                type='password'
                                margin='normal'
                                fullWidth />
                            <TextField
                                required
                                value={confirmarSenha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                                variant='outlined'
                                label='confirmarSenha'
                                name='confirmarSenha'
                                margin='normal'
                                type='password'
                                fullWidth />
                            <Divider />
                            <Box marginTop={2} textAlign='center'>
                                <Button
                                    type='submit'
                                    size='large'
                                    variant='contained'
                                    className='botaolog'
                                    fullWidth>
                                    Cadastrar
                                </Button>
                                <Box gap={4} marginY={2} >
                                    <Link to='/'>
                                        <Button
                                            color='secondary'
                                            type='submit'
                                            size='large'
                                            variant='contained'
                                            className='botaolog'
                                            fullWidth>
                                            Cancelar
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Grid>

            </Grid>
        </>
    );
}

export default CadastroUsuario;
