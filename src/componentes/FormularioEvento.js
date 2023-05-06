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
import { useEffect } from 'react'
import dayjs from 'dayjs'

export default function FormularioEvento() {
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

    const handleCidadeChange = (event, value) => {
        localStorage.setItem('event_cidade', value.cid_id)
        localStorage.setItem('comp_cidade', value.cid_id)
        localStorage.setItem('cid_desc', value.cid_desc)
    }

    const handleNomeEvento = (event) => {
        localStorage.setItem('event_nome', event.target.value)
    }

    const handleLocalEvento = (event) => {
        localStorage.setItem('event_local', event.target.value)
    }

    const handleEdicaoEvento = (event) => {
        localStorage.setItem('event_edicao', event.target.value)
    }

    const handleDataNascimento = (event) => {
        localStorage.setItem('event_data', dayjs(event).format('DD-MM-YYYY'))
    }

    useEffect(() => {
        api.post(
            '/api/auth/login',
            {
                usuario_login: 'admin',
                usuario_senha: 'senha',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) =>
                localStorage.setItem('accessToken', response.data.accessToken)
            )
            .catch((error) => console.error(error.response.data.message))
    }, []) // a lista de dependências está vazia para garantir que a função seja executada apenas uma vez

    const criarEvento = async (event) => {
        const dataEvento = {
            event_nome: localStorage.getItem('event_nome'),
            event_local: localStorage.getItem('event_local'),
            event_edicao: localStorage.getItem('event_edicao'),
            event_cidade: localStorage.getItem('event_cidade'),
            event_data: localStorage.getItem('event_data'),
        }

        try {
            const response = await api.post(
                '/api/admin/evento/criar',
                dataEvento,
                {
                    headers: {
                        'x-access-token': localStorage.getItem('accessToken'),
                    },
                }
            )
            console.log(response.data) // exibe a resposta do servidor
        } catch (error) {
            console.error(error) // exibe o erro, caso ocorra
        }
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
                            label="NOME DO EVENTO"
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
                            onChange={handleNomeEvento}
                        />

                        <TextField
                            id="outlined-basic"
                            label="LOCAL DO EVENTO"
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
                            onChange={handleLocalEvento}
                        />

                        <TextField
                            id="outlined-basic"
                            label="EDIÇÃO DO EVENTO"
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
                            onChange={handleEdicaoEvento}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="outlined-basic"
                            options={listaEstados}
                            sx={{
                                width: '100%',
                                borderRadius: '50px',
                                backgroundColor: 'white',
                                marginTop: '25%',
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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField
                                    onChange={handleDataNascimento}
                                    format="DD/MM/YYYY"
                                    label="DATA DO EVENTO"
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
                <Link to={'/'}>
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
                        CANCELAR
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
                <Link to={'/CadastroEvento2'}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#5C2863',
                            width: '250px',
                            borderRadius: '50px',
                            fontWeight: 'Bold',
                        }}
                        onClick={criarEvento}
                    >
                        PROSSEGUIR
                    </Button>
                </Link>
            </div>
        </Box>
    )
}
