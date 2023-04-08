import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Componente2 from './componentes/Componente2';
import Componente1 from './componentes/Componente1';
import Principal from './componentes/Principal';
import Cadastro from './componentes/Cadastro';
import FomularioCadastroDesfile from './componentes/FomularioCadastroDesfile';

const flag = 1;
const flag_zero = 0;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <Principal componenteUm={<Componente1 />} componenteDois={<Componente2 />} flag={flag} /> */}
   <Principal componenteUm={<Cadastro />} componenteDoisNew={<FomularioCadastroDesfile /> } flag={flag_zero} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



