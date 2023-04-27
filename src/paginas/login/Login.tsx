import './Login.css';
import { Button, Box, Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../service/Service';
import { useDispatch } from 'react-redux';
import { addId, addToken } from '../../store/tokens/action';
import { toast } from 'react-toastify';

function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate();
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
    });

    const [respUserLogin, setRespUserLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
    });

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })

    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            setIsLoading(true)
            await login('/usuarios/logar', userLogin, setRespUserLogin);
            toast.success('Login efetuado!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error('Usuário ou senha inválidos!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    useEffect(() => {
        if (respUserLogin.token !== '') {
            dispatch(addToken(respUserLogin.token));
            dispatch(addId(respUserLogin.id.toString()))
            history('/home')
        }
    }, [respUserLogin.token])

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid xs={6}>
                    <Box display='flex' justifyContent='center'  gap={6}>
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
                                error={userLogin.senha.length < 8 && userLogin.senha.length > 0}
                                helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'Senha inválida': ''}
                                value={userLogin.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                variant='outlined'
                                label='Senha'
                                fullWidth />

                            <Button disabled={isLoading} type='submit'
                                size='large'
                                variant='contained'
                                className='botaolog'
                                fullWidth>
                                {isLoading ? (<span >...</span>) : ('Login')}
                            </Button>
                        </form>
                    </Box>
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
