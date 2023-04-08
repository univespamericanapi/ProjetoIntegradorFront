import React from 'react'
import imagemlogo from '../Imagens/anime_fest.png'
import { Button } from '@mui/material'

const Componente2 = () => {
  return (
    <div>
        
        <div className='Imagem'>
        <img src={imagemlogo} alt="Logo Anime Fest2" className="center-img" />
        </div>
        
        <h1 className="titulo" >DESFILE COSPLAY</h1>
        
        <div className='Botao'>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >Cadastro</Button>
        </div>

    </div>
  )
}

export default Componente2


