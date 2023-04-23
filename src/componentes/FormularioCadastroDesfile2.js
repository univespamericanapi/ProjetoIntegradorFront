import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";

export default function FormularioCadastroDesfile2() {
  const [Evento, setEvento] = React.useState('');

  const handleChange = (event) => {
    setEvento(event.target.value);
  };

  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'  }}>

      <FormControl fullWidth>

      <Grid container spacing={2}>
      <Grid item xs={6}>
      <TextField id="outlined-basic" label="NOME COMPLETO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%'}} />
      
      <TextField id="outlined-basic" label="NOME SOCIAL/ARTÍSTICO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} />

      <TextField id="outlined-basic" label="CPF" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%'  }} />
      
      <TextField id="outlined-basic" label="DATA DE NASCIMENTO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%'  }} />
      </Grid>

      <Grid item xs={6}>

      <TextField id="outlined-basic" label="WHATSAPP" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%'  }} />

      <TextField id="outlined-basic" label="ESTADO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} />
      
      <TextField id="outlined-basic" label="CIDADE" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} />

      </Grid>
      </Grid>

      </FormControl>

      
      <div className='Botao' style={{ position: 'absolute', bottom: '5%', left: '5%',display: 'flex', justifyContent: 'flex-end'}}>
        <Link to ={'/CadastroDesfile'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >VOLTAR</Button>
         </Link>
        </div>

      <div className='Botao' style={{ position: 'absolute', bottom: '5%', right: '5%',display: 'flex', justifyContent: 'flex-end'}}>
        <Link to ={'/CadastroDesfile3'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >PROSSEGUIR</Button>
         </Link>
        </div>

    </Box>

  );
}   