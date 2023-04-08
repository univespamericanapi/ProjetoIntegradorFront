import React from 'react'
import imagemlogo from '../Imagens/anime_fest.png'

const Cadastro = () => {
  return (
    <div className='LeftNavBar'>
        
        
        <h1 className='TituloCadastro'> CADASTRO</h1>

        <h2 className='TituloCadastro2'> DESFILE COSPLAY </h2>

        <div className='ImagemCadastro'>
        <img src={imagemlogo} alt="Logo Anime Fest2" className="center-img2" />
        </div>



    </div>

    
  )
}

export default Cadastro