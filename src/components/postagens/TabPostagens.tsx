import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagens from '../postagens/ListaPostagens';


function TabPostagens() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" style={{backgroundColor: 'var(--blue)'}}>
          <Tabs centered  onChange={handleChange}>
            <Tab label="Todas as postagens" value="1"/>
            <Tab label="Sobre-nós" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" >
            <ListaPostagens />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre-nós</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">Bem-vinde! Somos uma comunidade de DJ's iniciantes que estão buscando novas experiências e oportunidades de tocar em lugares novos para mostrar as pessoas o que elas não sabem que gostam ou até mesmo as que sabem que gostam e estão lá para ouvir. Nosso grupo grupo toca várias vertentes de vários estilos: SpinnenKopf toca Techno, Dabague Fullon, Laomer, Icosta e Teta tocam TechHouse, Zanqueta Forest e Ícaro toca Phonk.</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagens;