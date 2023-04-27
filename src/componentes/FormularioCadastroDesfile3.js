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
import Autocomplete from '@mui/material/Autocomplete';

import api from '../Api.js';

export default function FormularioCadastroDesfile3() {
  const [Evento, setEvento] = React.useState('');

  const handleChange = (event) => {
    setEvento(event.target.value);
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
 
  ];


  const [listaCategorias, setCategorias] = React.useState([]);

  React.useEffect(() => {
    api.get('http://localhost:8080/api/lista/categoria')
      .then(response => {
        console.log(response.data)
        const categorias = response.data.map(categoria => ({ ...categoria, label: categoria.categ_nome }));
        setCategorias(categorias);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  console.log(listaCategorias);



  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'   }}>
    
      <FormControl fullWidth>

      <Grid container spacing={2}>
      <Grid item xs={6}>
      <TextField id="outlined-basic" label="NOME DO PERSONAGEM" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />
      
      <TextField id="outlined-basic" label="MÍDIA DE ORIGEM" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }} />

      </Grid>

      <Grid item xs={6}>

      <Autocomplete
      disablePortal
      id="outlined-basic"
      options={listaCategorias}
      sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
      renderInput={(params) => <TextField {...params} label="CATEGORIA" />}
      />

      {/* <TextField id="outlined-basic" label="CATEGORIA" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},  }} /> */}

      <TextField id="outlined-basic" label="REFERÊNCIA (Inserir Link)" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }} />
      
   

      </Grid>
      </Grid>

      </FormControl>

      <div className='Botao' style={{ position: 'absolute', bottom: '5%', left: '5%',display: 'flex', justifyContent: 'flex-end'}}>
      <Link to ={'/CadastroDesfile2'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >VOLTAR</Button>
      </Link>
        </div>

      <div className='Botao' style={{ position: 'absolute', bottom: '5%', right: '5%',display: 'flex', justifyContent: 'flex-end'}}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >CONCLUIR CADASTRO</Button>
        </div>




    </Box>

  );
}   