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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import {useState, useEffect} from 'react'
import dayjs from 'dayjs';


export default function FormularioEvento() {
  const [Evento, setEvento] = React.useState('');



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
        console.log(value)

        localStorage.setItem('est_id', value.est_id);
        localStorage.setItem('est_sigla', value.est_sigla);
        localStorage.setItem('est_desc', value.est_desc);

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


  const [cpf, setCpf] = useState('');

  const handleCpfChange = (event) => {
    const value = event.target.value

    setCpf(value);
    localStorage.setItem('comp_cpf', value);
    console.log(localStorage.getItem('comp_cpf'));
  };

  const [phone, setPhone] = useState('');

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    const value = event.target.value
      .replace(/\D/g, '') // remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, '($1) $2') // insere o primeiro parêntese e espaço
      .replace(/(\d)(\d{4})(\d{4})$/, '$1-$2-$3'); // insere os dois traços

    setPhone(value);
    localStorage.setItem('comp_whats', value);
    console.log(localStorage.getItem('comp_whats'));
  };

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  // ###########const [cpf, setCPF] = useState('');
  const [dataNasciemnto, setDataNascimento] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  const handleCidadeChange = (event, value) => {
    localStorage.setItem('cid_id', value.cid_id);
    localStorage.setItem('comp_cidade', value.cid_id);
    localStorage.setItem('cid_desc', value.cid_desc);
  };

  const handleLimite = (event) => {
    localStorage.setItem('conc_limit_inscr', event.target.value);
    console.log(localStorage.getItem('conc_limit_inscr'));
  
  }
 
  const handleNomeSocial = (event) => {
    localStorage.setItem('comp_nome_social', event.target.value);
    console.log(localStorage.getItem('comp_nome_social'));
    console.log(localStorage.getItem('comp_whats'));
  
  }

  const handleDataNascimento = (event) => {

    localStorage.setItem('comp_nasc', dayjs(event).format('DD-MM-YYYY'));
    console.log("teste")
    console.log(localStorage.getItem('comp_nasc'));

  
  }

  const handleEmail = (event) => {
    localStorage.setItem('comp_email', event.target.value);
    console.log(localStorage.getItem('comp_email'));

  }

  const handleSalvarClick = () => {
    console.log(localStorage.getItem('comp_nome'));
    console.log(localStorage.getItem('comp_nome_social'));
    console.log(localStorage.getItem('comp_cpf'));
    console.log(localStorage.getItem('comp_nasc'));
    console.log(localStorage.getItem('comp_whats'));
    console.log(localStorage.getItem('comp_cidade'));
    console.log(localStorage.getItem('comp_email'));
    console.log(localStorage.getItem('est_id'));
    console.log(localStorage.getItem('est_sigla'));
    console.log(localStorage.getItem('est_desc'));
  
  };


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


  const handleClickFinal = async (idConcurso) => {
    const data = {
      conc_limit_inscr: localStorage.getItem('conc_limit_inscr'),
      conc_limit_espera: 20,
      conc_limit_checkin: 0,
      conc_ativo: true,
      conc_data_ativ: '2023-06-22'
    };

    const config = {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    };

    try {
      const response = await api.put(`/api/admin/concurso/atualizar/${localStorage.getItem('conc_id')}`, data, config);
      console.log(response.data); // exibe a resposta do servidor, se houver
    } catch (error) {
      console.error(error); // exibe o erro, se ocorrer
    }
  };
  

  return (

    <Box sx={{ minWidth: 130,border: '1px solid white', padding: '1rem', borderRadius: '30px', width: '60%', height: '60%',  backgroundColor: '#FF914D', position: 'relative'  }}>

      <FormControl fullWidth>

      <Grid container spacing={2}>
      <Grid item xs={6}>

    
      <Autocomplete
        disablePortal
        id="outlined-basic"
        options={listaEventos}
        sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
        renderInput={(params) => <TextField {...params} label="EVENTO" />}
        onChange={handleEventoChange}
        />

  <Autocomplete
        disablePortal
        id="outlined-basic"
        options={listaModalidades}
        sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},}, }}
        renderInput={(params) => <TextField {...params} label="MODALIDADE" />}

        onChange={handleEventoChange2}
        
        />


     
      </Grid>

      <Grid item xs={6}>


      <TextField id="outlined-basic" label="LIMITE DE INSCRIÇÕES" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '25%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}}  onChange={handleLimite}/>
      

      {/* <TextField id="outlined-basic" label="DATA DE NASCIMENTO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%','& .MuiOutlinedInput-root': {'& fieldset': {borderWidth: 0,},},}} /> */}

      {/* <TextField id="outlined-basic" label="ESTADO" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} /> */}
      
      {/* <TextField id="outlined-basic" label="CIDADE" variant="outlined" sx={{ width: '100%', borderRadius: '50px', backgroundColor: 'white', marginTop: '10%' }} /> */}

      </Grid>
      </Grid>

      </FormControl>

      
      <div className='Botao' style={{ position: 'absolute', bottom: '5%', left: '5%',display: 'flex', justifyContent: 'flex-end'}}>
        <Link to ={'/CadastroEvento'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'  }} >VOLTAR</Button>
         </Link>
        </div>

      <div className='Botao' style={{ position: 'absolute', bottom: '5%', right: '5%',display: 'flex', justifyContent: 'flex-end'}}>
        <Link to ={'/'}>
         <Button variant="contained" size="large" sx={{ bgcolor: '#5C2863', width: '250px',  borderRadius: '50px', fontWeight: 'Bold'   }} onClick={handleClickFinal} >CONCLUIR CADASTRO</Button>
         </Link>
        </div>

    </Box>

  );
}   