import './Login.css';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../service/Service';
import useLocalStorage from 'react-use-localstorage'

function Login() {

    const history = useNavigate()

    const [token, setToken] = useLocalStorage('token')

    const [userLogin, setUserLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    })

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })

    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await login('/usuarios/logar', userLogin, setToken);
            alert('Login efetuado com sucesso!')
            history('/home')
        } catch (error) {
            console.log(error)
            alert('Usuário ou senha inválidos!')
        }

    }

    useEffect(() => {
        if (token !== '') {
            history('/home')
        }
    }, [token])

    return (
        <>
            <Grid container alignItems={'center'} style={{ backgroundColor: 'var(--white)' }}>
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
                                Entrar
                            </Typography>

                            <TextField
                                variant='outlined'
                                name='usuario'
                                value={userLogin.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                label='Usuário'
                                fullWidth />

                            <TextField
                                type='password'
                                name='senha'
                                value={userLogin.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='Senha'
                                fullWidth />

                            <Button
                                type='submit'
                                size='large'
                                variant='contained'
                                className='botaolog'
                                fullWidth>
                                Login
                            </Button>
                        </form>
                    </Box>
                    <hr />
                    <Typography
                        align='center'
                        variant="body1"
                    >Ainda não tem uma conta? <Link to='/cadastrousuario' className='linklogin'>Cadastre-se aqui</Link></Typography>
                </Grid>
                <Grid xs={6} className='imglogin'></Grid>
            </Grid>
        </>
    );
}
export default Login;
