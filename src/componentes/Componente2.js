import React, { useState, useEffect } from 'react';
import imagemlogo from '../Imagens/anime_fest.png'
import { Button } from '@mui/material'
import {Link} from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import api from '../Api.js';
import axios from 'axios';

api.post('/api/auth/login', {
  usuario_login: 'admin',
  usuario_senha: 'senha'
}, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response =>  console.log(response.data))
.catch(error => console.error(error.response.data.message));


const Componente2 = () => {


  const [listaEventos, setListaEventos] = React.useState([]);
  const [listaModalidades, setModalidades] = React.useState([]);

  

  console.log("iniciado")


  React.useEffect(() => {
    api.get('http://localhost:8080/api/lista/evento')
      .then(response => {
        console.log("entrei")
        console.log(response.data)
        const eventos = response.data.map(evento => ({ ...evento, label: evento.event_ed_nome }));
        setListaEventos(eventos);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  const handleEventoChange = (event, value) => {
    
    if (value) {
      // fazer requisição para obter as modalidades do estado selecionado
        console.log(value)
        console.log("mudou")
        axios.get('http://localhost:8080/api/lista/concurso/'+value.event_id)
        .then(function (response) {

          const modalidades = response.data.map(modalidades => ({ ...modalidades, label: modalidades.conc_nome }));

          setModalidades(modalidades)
          console.log(value)
          console.log("joguei no local storage")

          localStorage.setItem('event_id', value.event_id);
          localStorage.setItem('event_ed_nome', value.event_ed_nome);
  


        })
        .catch(function (error) {
          console.log(error);
        });

    } else {
      console.log("else")
    }
  };


  const handleEventoChange2 = (event, value) => {

    localStorage.setItem('conc_id', value.conc_id);
    localStorage.setItem('conc_nome', value.conc_nome);

    console.log(localStorage.getItem('event_id'));
    console.log(localStorage.getItem('event_ed_nome'));
    console.log(localStorage.getItem('conc_id'));
    console.log(localStorage.getItem('conc_nome'));

  };




  return (
    <div>
        
        <div className='Imagem'>
        <img src={imagemlogo} alt="Logo Anime Fest2" className="center-img" />
        </div>
        
        {/* <h1 className="titulo" >DESFILE COSPLAY</h1> */}
        


        <h1 className="titulo" >SELECIONE O EVENTO</h1>

        <Autocomplete
        disablePortal
        id="outlined-basic"
        options={listaEventos}
        sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
        renderInput={(params) => <TextField {...params} label="EVENTO" />}
        onChange={handleEventoChange}
        />

        <h1 className="titulo" >SELECIONE A MODALIDADE</h1>

        
        <Autocomplete
        disablePortal
        id="outlined-basic"
        options={listaModalidades}
        sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
        renderInput={(params) => <TextField {...params} label="MODALIDADE" />}

        onChange={handleEventoChange2}
        
        />

        <div className='Botao'>

        <Link to ={'/CadastroDesfile'}>
        <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold', marginTop: '10%'  }} >Cadastro</Button>
        </Link>

        </div>

    </div>
  )
}

export default Componente2


