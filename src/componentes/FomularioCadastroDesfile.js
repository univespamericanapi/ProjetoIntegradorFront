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


  const [nomeAceite, setAceite] = useState(false);


  const handleAceite = (event, value) => {

    setAceite('true');

    console.log("entrei")
    
    localStorage.setItem('part_aceit_regul', true);

    console.log(localStorage.getItem('part_aceit_regul'));

  };
  
  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'  }}>
 


      
      <h2 style={{ color: 'white' }}>Regras do concurso:</h2>
      <p>TEXTO TEXTO TEXTO TEXTO</p>


      <div className='Botao' style={{ position: 'absolute', bottom: '5%', left: '5%',display: 'flex', justifyContent: 'flex-end'}}>
        <Link to ={'/'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >CANCELAR</Button>
         </Link>
        </div>


      <div className='Botao' style={{ position: 'absolute', bottom: '5%', right: '5%',display: 'flex', justifyContent: 'flex-end'}}>
         <Link to ={'/CadastroDesfile2'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} onClick = {handleAceite} >ACEITAR</Button>
         </Link>
        </div>

    </Box>

  );
}