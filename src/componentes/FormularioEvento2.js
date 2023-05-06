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

export default function FormularioEvento() {
    const [listaEventos, setListaEventos] = React.useState([])
    const [listaModalidades, setModalidades] = React.useState([])

    React.useEffect(() => {
        api.get('http://localhost:8080/api/lista/evento')
            .then((response) => {
                console.log('entrei')
                console.log(response.data)
                const eventos = response.data.map((evento) => ({
                    ...evento,
                    label: evento.event_ed_nome,
                }))
                setListaEventos(eventos)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleLimite = (event) => {
        localStorage.setItem('conc_limit_inscr', event.target.value)
    }

    const handleEventoChange = (event, value) => {
        if (value) {
            // fazer requisição para obter as modalidades do estado selecionado

            axios
                .get(
                    'http://localhost:8080/api/lista/concurso/' + value.event_id
                )
                .then(function (response) {
                    const modalidades = response.data.map((modalidades) => ({
                        ...modalidades,
                        label: modalidades.conc_nome,
                    }))

                    setModalidades(modalidades)

                    localStorage.setItem('event_id', value.event_id)
                    localStorage.setItem('event_ed_nome', value.event_ed_nome)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            console.log('else')
        }
    }

    const handleEventoChange2 = (event, value) => {
        localStorage.setItem('conc_id', value.conc_id)
        localStorage.setItem('conc_nome', value.conc_nome)
    }

    const handleClickFinal = async (idConcurso) => {
        const data = {
            conc_limit_inscr: localStorage.getItem('conc_limit_inscr'),
            conc_limit_espera: 20,
            conc_limit_checkin: 0,
            conc_ativo: true,
            conc_data_ativ: '2023-06-22',
        }

        const config = {
            headers: {
                'x-access-token': localStorage.getItem('accessToken'),
            },
        }

        try {
            const response = await api.put(
                `/api/admin/concurso/atualizar/${localStorage.getItem(
                    'conc_id'
                )}`,
                data,
                config
            )
            console.log(response.data) // exibe a resposta do servidor, se houver
        } catch (error) {
            console.error(error) // exibe o erro, se ocorrer
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
                        <Autocomplete
                            disablePortal
                            id="outlined-basic"
                            options={listaEventos}
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
                                <TextField {...params} label="EVENTO" />
                            )}
                            onChange={handleEventoChange}
                        />

                        <Autocomplete
                            disablePortal
                            id="outlined-basic"
                            options={listaModalidades}
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
                                <TextField {...params} label="MODALIDADE" />
                            )}
                            onChange={handleEventoChange2}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="LIMITE DE INSCRIÇÕES"
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
                            onChange={handleLimite}
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
                <Link to={'/CadastroEvento'}>
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
                        onClick={handleClickFinal}
                    >
                        CONCLUIR CADASTRO
                    </Button>
                </Link>
            </div>
        </Box>
    )
}
