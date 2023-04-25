import React from 'react'
import imagemlogo from '../Imagens/anime_fest.png'
import { Button } from '@mui/material'
import {Link} from "react-router-dom";

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
  return (
    <div>
        
        <div className='Imagem'>
        <img src={imagemlogo} alt="Logo Anime Fest2" className="center-img" />
        </div>
        
        <h1 className="titulo" >DESFILE COSPLAY</h1>
        
        <div className='Botao'>

        <Link to ={'/CadastroDesfile'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >Cadastro</Button>
        </Link>
        
        </div>

    </div>
  )
}

export default Componente2


