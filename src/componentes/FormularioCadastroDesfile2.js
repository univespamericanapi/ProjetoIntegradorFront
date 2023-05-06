import * as React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import api from '../Api.js'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { useState } from 'react'
import dayjs from 'dayjs'

export default function FormularioCadastroDesfile2() {
    const [listaEstados, setListaEstados] = React.useState([])

    React.useEffect(() => {
        api.get('http://localhost:8080/api/lista/estado')
            .then((response) => {
                const estados = response.data.map((estado) => ({
                    ...estado,
                    label: estado.est_desc,
                }))
                setListaEstados(estados)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const [listaCidades, setCidades] = React.useState([])

    const handleEstadoChange = (event, value) => {
        if (value) {
            // fazer requisição para obter as cidades do estado selecionado

            localStorage.setItem('est_id', value.est_id)
            localStorage.setItem('est_sigla', value.est_sigla)
            localStorage.setItem('est_desc', value.est_desc)

            axios
                .get('http://localhost:8080/api/lista/cidade', {
                    params: {
                        estado: value.est_id,
                    },
                })
                .then(function (response) {
                    const cidades = response.data.map((cidade) => ({
                        ...cidade,
                        label: cidade.cid_desc,
                    }))

                    setCidades(cidades)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            console.log('else')
            setCidades([])
        }
    }

    const [cpf, setCpf] = useState('')

    const handleCpfChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, '') // remove caracteres não numéricos
            .replace(/(\d{3})(\d)/, '$1.$2') // insere o primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2') // insere o segundo ponto
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // insere o traço
            .replace(/(-\d{2})\d+?$/, '$1') // remove os dígitos excedentes

        setCpf(value)
        localStorage.setItem('comp_cpf', value)
    }

    const [phone, setPhone] = useState('')

    const handlePhoneChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, '') // remove caracteres não numéricos
            .replace(/(\d{2})(\d)/, '($1) $2') // insere o primeiro parêntese e espaço
            .replace(/(\d)(\d{4})(\d{4})$/, '$1-$2-$3') // insere os dois traços

        setPhone(value)
        localStorage.setItem('comp_whats', value)
    }

    const handleCidadeChange = (event, value) => {
        localStorage.setItem('cid_id', value.cid_id)
        localStorage.setItem('comp_cidade', value.cid_id)
        localStorage.setItem('cid_desc', value.cid_desc)
    }

    const handleNome = (event) => {
        localStorage.setItem('comp_nome', event.target.value)
    }

    const handleNomeSocial = (event) => {
        localStorage.setItem('comp_nome_social', event.target.value)
    }

    const handleDataNascimento = (event) => {
        localStorage.setItem('comp_nasc', dayjs(event).format('DD-MM-YYYY'))
    }

    const handleEmail = (event) => {
        localStorage.setItem('comp_email', event.target.value)
    }

    const handleSalvarClick = () => {
        console.log(localStorage.getItem('comp_nome'))
        console.log(localStorage.getItem('comp_nome_social'))
        console.log(localStorage.getItem('comp_cpf'))
        console.log(localStorage.getItem('comp_nasc'))
        console.log(localStorage.getItem('comp_whats'))
        console.log(localStorage.getItem('comp_cidade'))
        console.log(localStorage.getItem('comp_email'))
        console.log(localStorage.getItem('est_id'))
        console.log(localStorage.getItem('est_sigla'))
        console.log(localStorage.getItem('est_desc'))
    }

    return (
        <Box
            sx={{
                minWidth: 130,
                border: '1px solid white',
                padding: '1rem',
                borderRadius: '30px',
                width: '60%',
                height: '60%',
                backgroundColor: '#FF914D',
                position: 'relative',
            }}
        >
            <FormControl fullWidth>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="NOME COMPLETO"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '25%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                            onChange={handleNome}
                        />

                        <TextField
                            id="outlined-basic"
                            label="NOME SOCIAL/ARTÍSTICO"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '10%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                            onChange={handleNomeSocial}
                        />

                        <TextField
                            id="outlined-basic"
                            label="CPF"
                            value={cpf}
                            onChange={handleCpfChange}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '10%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField
                                    onChange={handleDataNascimento}
                                    format="DD/MM/YYYY"
                                    label="DATA DE NASCIMENTO"
                                    sx={{
                                        width: '100%',
                                        borderRadius: '50px',
                                        backgroundColor: 'white',
                                        marginTop: '8%',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderWidth: 0 },
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="WHATSAPP"
                            value={phone}
                            onChange={handlePhoneChange}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '25%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                        />

                        <Autocomplete
                            disablePortal
                            id="outlined-basic"
                            options={listaEstados}
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '10%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="ESTADO" />
                            )}
                            onChange={handleEstadoChange}
                        />

                        <Autocomplete
                            disablePortal
                            id="outlined-basic"
                            options={listaCidades}
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '10%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="CIDADE" />
                            )}
                            onChange={handleCidadeChange}
                        />

                        <TextField
                            type="email"
                            id="outlined-basic"
                            label="E-MAIL"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '10%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderWidth: 0 },
                                },
                            }}
                            onChange={handleEmail}
                        />
                    </Grid>
                </Grid>
            </FormControl>

            <div
                className="Botao"
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Link to={'/CadastroDesfile'}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#5C2863',
                            width: '250px',
                            borderRadius: '50px',
                            fontWeight: 'Bold',
                        }}
                    >
                        VOLTAR
                    </Button>
                </Link>
            </div>

            <div
                className="Botao"
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Link to={'/CadastroDesfile3'}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#5C2863',
                            width: '250px',
                            borderRadius: '50px',
                            fontWeight: 'Bold',
                        }}
                        onClick={handleSalvarClick}
                    >
                        PROSSEGUIR
                    </Button>
                </Link>
            </div>
        </Box>
    )
}
