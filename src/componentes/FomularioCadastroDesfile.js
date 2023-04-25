import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Menu } from '@mui/material';
import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";

import api from '../Api.js';
import axios from 'axios';


export default function FormularioCadastroDisfile2() {  
  const [Evento, setEvento] = React.useState('');

  const handleChange = (event) => {
    setEvento(event.target.value);
  };
  
  // useEffect(() => {
  //   api.get('').then(res =>{
  //     console.log(res.data.message)
  //   })
  // }, [])


  const teste = api.get('').then(res =>console.log(res.data.message));

  console.log( teste)


  // const myJSON = JSON.stringify(teste);

  // console.log( myJSON + 12)


  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'  }}>
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
          {/* <MenuItem value={40}>{myJSON}</MenuItem> */}
 
        

        </Select>
      </FormControl>
      <h2 style={{ color: 'white' }}>Regras desfile cosplay:</h2>
      <p>TEXTO TEXTO TEXTO TEXTO</p>
      <div className='Botao' style={{ position: 'absolute', bottom: '5%', right: '5%',display: 'flex', justifyContent: 'flex-end'}}>
         <Link to ={'/CadastroDesfile2'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >PROSSEGUIR</Button>
         </Link>
        </div>

    </Box>

  );
}