import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokenReducer";
import { useEffect, useState } from "react";
import { Usuario } from "../../models/Usuario";
import { getId } from '../../service/Service';
import { Avatar, Box, Card, CardContent, Grid, Link, Typography, makeStyles } from "@mui/material";


function Perfil() {


    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    const token = useSelector<TokenState, TokenState['token']>(
        (state) => state.token
    )

    const [usuario, setUsuario] = useState<Usuario>({
        id: +userId,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
    })

    async function getUserById(id: number) {
        await getId(`/usuarios/${id}`, setUsuario, {
            headers: { Authorization: token }
        })
    }

    useEffect(() => {
        getUserById(+userId)
    }, [])

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh', backgroundColor: 'var(--blue)' }}>
                    <Grid xs={9} justifyContent='center'>
                        <Box display={'flex'} flexDirection={'column'} gap={1}>
                            <Avatar src={usuario.foto} style={{ width: '15rem', height: '15rem', margin: '0 auto' }} />
                            <br />
                            <Typography variant="h5"
                                gutterBottom
                                color="textPrimary"
                                component="h5"
                                align="center"
                                className='textos1'>Postagens de {usuario.nome}</Typography>
                            <br />
                            {usuario.postagem?.map((post) => (
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Typography variant='h5' component='h2' >
                                            <strong>{post.titulo}</strong>
                                        </Typography>
                                        <Typography variant='h5' component='p'>
                                            {post.tema?.descricao}
                                        </Typography>
                                        <Typography variant='body1' component='p'>
                                            {post.texto}
                                        </Typography>
                                        <Typography variant='body1' component='p'>
                                            <a href={post.link} target='_blank'>Set SoundCloud</a>
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Data: {Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(post.data))}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Grid>
                </Grid >
            </Box>
        </>
    );
}
export default Perfil;
