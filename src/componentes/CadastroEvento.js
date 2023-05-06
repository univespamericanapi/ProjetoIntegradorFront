import React from 'react'
import imagemlogo from '../Imagens/anime_fest.png'
import { Link } from 'react-router-dom'

const CadastroEvento = () => {
    return (
        <div className="LeftNavBar">
            <h1 className="TituloCadastro"> CADASTRO</h1>

            <h2 className="TituloCadastro3"> CADASTRO DO EVENTO </h2>

            <h2 className="TituloCadastro2"> INFORMAÇÃO DO EVENTO </h2>

            <h2 className="TituloCadastro2"> </h2>

            <div className="ImagemCadastro2">
                <Link to={'/'}>
                    <img
                        src={imagemlogo}
                        alt="Logo Anime Fest2"
                        className="center-img2"
                    />
                </Link>
            </div>
        </div>
    )
}

export default CadastroEvento
