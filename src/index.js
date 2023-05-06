import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Componente2 from './componentes/Componente2';
import Componente1 from './componentes/Componente1';
import Principal from './componentes/Principal';
import Cadastro from './componentes/Cadastro';
import Cadastro2 from './componentes/Cadastro2';
import Cadastro3 from './componentes/Cadastro3';

import FomularioCadastroDesfile from './componentes/FomularioCadastroDesfile';
import FormularioCadastroDesfile2 from './componentes/FormularioCadastroDesfile2';
import FormularioCadastroDesfile3 from './componentes/FormularioCadastroDesfile3';

import FormularioEvento from './componentes/FormularioEvento'
import CadastroEvento from './componentes/CadastroEvento'

import FormularioEvento2 from './componentes/FormularioEvento2'
import CadastroEvento2 from './componentes/CadastroEvento2'



import api from './Api.js';
import axios from 'axios';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Flags do CSS

const flag = 1;
const flag_zero = 0;

// Importando React Router



const router = createBrowserRouter([

  {
    path: "/",
    element: <Principal componenteUm={<Componente1 />} componenteDois={<Componente2 />} flag={flag} />,
  },

  {
    path: "/CadastroDesfile",
    element:  <Principal componenteUm={<Cadastro />} componenteDoisNew={<FomularioCadastroDesfile /> } flag={flag_zero} />,
  },

  {
    path: "/CadastroDesfile2",
    element:  <Principal componenteUm={<Cadastro2 />} componenteDoisNew={<FormularioCadastroDesfile2 /> } flag={flag_zero} />,
  },

  {
    path: "/CadastroDesfile3",
    element: <Principal componenteUm={<Cadastro3 />} componenteDoisNew={<FormularioCadastroDesfile3 /> } flag={flag_zero} />,
  },

  {
    path: "/CadastroEvento",
    element: <Principal componenteUm={<CadastroEvento />} componenteDoisNew={<FormularioEvento /> } flag={flag_zero} />,
  },


  {
    path: "/CadastroEvento2",
    element: <Principal componenteUm={<CadastroEvento2 />} componenteDoisNew={<FormularioEvento2 /> } flag={flag_zero} />,
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

  <RouterProvider router={router} />

   {/* <Principal componenteUm={<Componente1 />} componenteDois={<Componente2 />} flag={flag} /> */}
   {/* <Principal componenteUm={<Cadastro />} componenteDoisNew={<FomularioCadastroDesfile /> } flag={flag_zero} /> */}
   {/* <Principal componenteUm={<Cadastro />} componenteDoisNew={<FormularioCadastroDesfile2 /> } flag={flag_zero} /> */}
   {/* <Principal componenteUm={<Cadastro />} componenteDoisNew={<FormularioCadastroDesfile3 /> } flag={flag_zero} /> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



