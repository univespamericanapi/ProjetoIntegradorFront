import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

export default function FomularioCadastroDesfile() {
  const [Evento, setEvento] = React.useState('');

  const handleChange = (event) => {
    setEvento(event.target.value);
  };

  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D'  }}>
        <h2 style={{ color: 'white' }}>SELECIONE O EVENTO:</h2>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" >Evento</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Evento}
          label="Evento"
          onChange={handleChange}
          sx={{ backgroundColor: '#ECECEC', borderRadius: '50px', width: '50%'}}
        >
          <MenuItem value={10}>27º CAMPINAS ANIME FEST</MenuItem>
          <MenuItem value={20}>26º PIRA ANIME FEST</MenuItem>
          <MenuItem value={30}>25º RIBEIRÃO PRETO ANIME FEST</MenuItem>
        </Select>
      </FormControl>
      <h2 style={{ color: 'white' }}>Regras desfile cosplay:</h2>
      <p>TEXTO TEXTO TEXTO TEXTO</p>
      <div className='Botao' style={{ display: 'flex', justifyContent: 'flex-end', paddingTop:'35%'}}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >PROSSEGUIR</Button>
        </div>

    </Box>

  );
}