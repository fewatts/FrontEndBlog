import './Login.css';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <>
            <Grid container alignItems={'center'} style={{ backgroundColor: 'var(--white)' }}>
                <Grid xs={6}>
                    <Box display='flex' justifyContent='center'>
                        <form>
                            <Typography
                            variant="h5"
                            gutterBottom
                            color="textPrimary"
                            component="h5"
                            align="center"
                            style={{ color: 'var(--white)', fontWeight: 'bold', backgroundColor: 'var(--blue)'}}>
                                Entrar
                            </Typography>

                            <TextField variant='outlined' label='Usuário' fullWidth />
                            <TextField variant='outlined' label='Senha' fullWidth />

                            <Link to='/home'><Button variant="outlined" 
                            style={{ borderColor: 'white', backgroundColor: 'var(--blue)', color: 'white' }}>
                                Logar
                            </Button></Link>
                        </form>
                    </Box>
                </Grid>
              <Grid xs={6} className='imglogin'></Grid>
            </Grid>
        </>
    );    
}
export default Login;
