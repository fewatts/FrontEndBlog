import React from 'react';
import './Cadastrousuario.css';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../service/Service';
import './Cadastrousuario.css';

function CadastroUsuario() {

    const navegate = useNavigate;

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

    return (
        <>
            <Grid container alignItems={'center'} className='containercad'>
                <Grid xs={6} className='imgcad'></Grid>
                <Grid xs={6}>
                    <Box display='flex' justifyContent='center'>
                        <form onSubmit={onSubmit}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                color="textPrimary"
                                component="h5"
                                align="center"
                                className='textos1'>
                                Cadastro
                            </Typography>

                            <TextField
                                variant='outlined'
                                name='nome'
                                value={usuario.nome}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                label='Nome completo'
                                margin='normal'
                                fullWidth />
                            <TextField
                                variant='outlined'
                                name='usuario'
                                value={usuario.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                label='Usuário (endereço de e-mail)'
                                margin='normal'
                                fullWidth />
                            <TextField
                                variant='outlined'
                                name='foto'
                                value={usuario.foto}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                label='Foto (Endereço URL)'
                                margin='normal'
                                fullWidth />
                            <TextField
                                type='password'
                                name='senha'
                                value={usuario.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='Senha'
                                margin='normal'
                                fullWidth />
                            <TextField
                                type='password'
                                name='confirmarSenha'
                                value={confirmarSenha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                                variant='outlined'
                                label='Confirmar Senha'
                                margin='normal'
                                fullWidth />

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
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
export default CadastroUsuario;
