import Chart from 'chart.js/auto';
import React, { Component } from 'react';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';
import api from '../../services/api';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';

export class Graficos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaEventos: [],
            dataConcurso: {},
            dataCidade: {},
            dataFaixaEtaria: {},
            dadosCarregados: false,
            values: {
                conc_event: 0,
                conc_event_nome: '',
            },
            selectBoxStyle: { width: '90%' },
        };

        this.state.initialValues = { ...this.state.values };

        this.fetchEventos = this.fetchEventos.bind(this);
        this.eventoSelecionado = this.eventoSelecionado.bind(this);
        this.fetchEventos();
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            (response) => {
                this.setState({
                    content: response.data,
                });
                this.props.setLogged(true);
            },
            (error) => {
                this.setState({
                    content:
                        (error.response?.data?.message) ||
                        error.message ||
                        error.toString(),
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch('logout');
                }

                this.props.setLogged(false);

                this.props.logOut();
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dataCidade !== this.state.dataCidade) {
            this.criarGrafico(
                this.state.dataCidade,
                "grafico-cidade",
                "grafico-cidade-place",
                "pie"
            );
        }

        if (prevState.dataConcurso !== this.state.dataConcurso) {
            this.criarGrafico(
                this.state.dataConcurso,
                "grafico-concurso",
                "grafico-concurso-place",
                "pie"
            );
        }

        if (prevState.dataFaixaEtaria !== this.state.dataFaixaEtaria) {
            this.criarGrafico(
                this.state.dataFaixaEtaria,
                "grafico-etario",
                "grafico-etario-place",
                "bar"
            );
        }
    }

    handleChangeAutocomplete = (value) => {
        this.setState((prevState, props) => { // função que recebe o estado anterior e as props como parâmetros
            return { // retorna um objeto com as alterações de estado
                values: {
                    ...prevState.values, // mantém os valores anteriores
                    ...value, // adiciona ou atualiza um valor
                },
            };
        });
    };

    async fetchEventos() {
        try {
            const response = await api.get('/lista/evento');
            const eventos = response.data.map((evento) => ({
                conc_event: evento.event_id,
                conc_event_nome: evento.event_ed_nome,
            }));
            this.setState({ listaEventos: eventos });
        } catch (error) {
            console.error(error);
        }
    }

    eventoSelecionado = async (event, value) => {
        try {
            this.handleChangeAutocomplete(value);
            const dataCidade = await api.get(`/admin/grafico/cidade/${value.conc_event}`);
            const dataConcurso = await api.get(`/admin/grafico/concurso/${value.conc_event}`);
            const dataFaixaEtaria = await api.get(`/admin/grafico/faixas-etarias/${value.conc_event}`);
            this.setState({
                dadosCarregados: true,
                dataCidade: dataCidade.data,
                dataConcurso: dataConcurso.data,
                dataFaixaEtaria: dataFaixaEtaria.data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    criarGrafico = (data, id, place, type) => {
        const canvas = document.getElementById(id);
        const canvasPlace = document.getElementById(place);
        if (canvas) {
            canvasPlace.removeChild(canvas);
            const newCanvas = document.createElement('canvas');
            newCanvas.id = id;
            canvasPlace.appendChild(newCanvas);
            const grafico = new Chart(newCanvas, {
                type: type,
                data: data,
            });
            grafico.legend.options.display = false;
            return grafico;
        }
        return null;
    };

    render() {
        const { conc_event, conc_event_nome } = this.state.values;
        const { listaEventos, dadosCarregados, selectBoxStyle } = this.state;

        return (
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        marginTop: '1.875rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Autocomplete
                        id="cad-select-evento"
                        getOptionLabel={(listaEventos) =>
                            `${listaEventos.conc_event_nome}`
                        }
                        options={listaEventos}
                        sx={selectBoxStyle}
                        isOptionEqualToValue={(option, value) =>
                            option.conc_event_nome === value.conc_event_nome
                        }
                        noOptionsText={'Nenhum evento está disponível.'}
                        renderOption={(props, listaEventos) => (
                            <Box component="li" {...props} key={listaEventos.conc_event}>
                                {listaEventos.conc_event_nome}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Evento" variant="outlined" />
                        )}
                        onChange={(event, values, select, option) => {
                            this.eventoSelecionado(event, values, select, option);
                        }}
                        value={{
                            conc_event: conc_event,
                            conc_event_nome: conc_event_nome,
                        }}
                        disableClearable
                    />
                </Box>
                {dadosCarregados &&
                    <Box sx={{
                        width: '100%',
                        marginTop: '1.875rem',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                marginTop: '1.875rem',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '18%',
                                    marginTop: '1.875rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                id="grafico-cidade-place"
                            >
                                <Typography sx={{
                                    fontSize: '12px',
                                    marginBottom: '20px',
                                    color: '#572d7f',
                                }}>
                                    Competidores / Cidade
                                </Typography>
                                <canvas id="grafico-cidade" />
                            </Box>
                            <Box
                                sx={{
                                    width: '18%',
                                    marginTop: '1.875rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                id="grafico-concurso-place"
                            >
                                <Typography sx={{
                                    fontSize: '12px',
                                    marginBottom: '20px',
                                    color: '#572d7f',
                                }}>
                                    Competidores / Concurso
                                </Typography>
                                <canvas id="grafico-concurso" />
                            </Box>
                            <Box
                                sx={{
                                    width: '28%',
                                    marginTop: '1.875rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                id="grafico-etario-place"
                            >
                                <Typography sx={{
                                    fontSize: '12px',
                                    marginBottom: '20px',
                                    color: '#572d7f',
                                }}>
                                    Faixa Etária
                                </Typography>
                                <canvas id="grafico-etario" />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                marginTop: '1.875rem',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >

                        </Box>
                    </Box>
                }
            </Box>
        );
    };
}