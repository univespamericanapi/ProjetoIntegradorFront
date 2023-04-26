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
import api from '../Api.js';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

export default function FormularioCadastroDesfile2() {
  const [Evento, setEvento] = React.useState('');

  const handleChange = (event) => {
    setEvento(event.target.value);
  };

  const [listaEstados, setListaEstados] = React.useState([]);

  React.useEffect(() => {
    api.get('http://localhost:8080/api/lista/estado')
      .then(response => {
        console.log(response.data)
        const estados = response.data.map(estado => ({ ...estado, label: estado.est_desc }));
        setListaEstados(estados);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  console.log(listaEstados);


  const [listaCidades, setCidades] = React.useState([]);

  const handleEstadoChange = (event, value) => {
  
    if (value) {
      // fazer requisição para obter as cidades do estado selecionado
        console.log(value.est_id)

        axios.get('http://localhost:8080/api/lista/cidade', {
          params: {
            estado: value.est_id
          }
        })
        .then(function (response) {
          console.log(response.data);
          const cidades = response.data.map(cidade => ({ ...cidade, label: cidade.cid_desc }));
          console.log(cidades)
          setCidades(cidades)
        })
        .catch(function (error) {
          console.log(error);
        });

    } else {
      console.log("else")
      setCidades([])
    }
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
 
  ];



  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'  }}>

      <FormControl fullWidth>

      <Grid container spacing={2}>
      <Grid item xs={6}>

      <TextField id="outlined-basic" label="NOME COMPLETO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />
      
      <TextField id="outlined-basic" label="NOME SOCIAL/ARTÍSTICO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />
     
      <TextField id="outlined-basic" label="CPF" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />
      
      <TextField id="outlined-basic" label="DATA DE NASCIMENTO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />
      </Grid>

      <Grid item xs={6}>

      <TextField id="outlined-basic" label="WHATSAPP" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} />

      <Autocomplete
      disablePortal
      id="outlined-basic"
      options={listaEstados}
      sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
      renderInput={(params) => <TextField {...params} label="ESTADO" />}
      onChange={handleEstadoChange}
      />

      <Autocomplete
      disablePortal
      id="outlined-basic"
      options={listaCidades}
      sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
      renderInput={(params) => <TextField {...params} label="CIDADE" />}
      
      />


      {/* <TextField id="outlined-basic" label="ESTADO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} /> */}
      
      {/* <TextField id="outlined-basic" label="CIDADE" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} /> */}

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