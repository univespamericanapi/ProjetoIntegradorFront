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
            listaConcursos: [],
            dataConcurso: {},
            dataCidade: {},
            dataFaixaEtaria: {},
            dataTemas: {},
            dadosCarregados: false,
            dadosCarregadosConc: false,
            values: {
                conc_event: 0,
                conc_event_nome: '',
                part_conc: 0,
                part_conc_nome: '',
            },
            selectBoxStyle: { width: '45%' },
        };

        this.state.initialValues = { ...this.state.values };

        this.fetchEventos = this.fetchEventos.bind(this);
        this.eventoSelecionado = this.eventoSelecionado.bind(this);
        this.fetchEventos();
        this.fetchConcursos = this.fetchConcursos.bind(this);
        this.concursoSelecionado = this.concursoSelecionado.bind(this);
        this.fetchConcursos();
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
                "polarArea"
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

        if (prevState.dataTemas !== this.state.dataTemas) {
            this.criarGrafico(
                this.state.dataTemas,
                "grafico-temas",
                "grafico-temas-place",
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

    async fetchConcursos(part_event) {
        try {
            const response = await api.get('/lista/concurso/' + part_event);
            const concursos = response.data.map((concurso) => ({
                part_conc: concurso.conc_id,
                part_conc_nome: concurso.conc_nome,
            }));
            this.setState({ listaConcursos: concursos });
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
            this.setState((prevState, props) => {
                return {
                    dadosCarregados: true,
                    dadosCarregadosConc: false,
                    dataCidade: dataCidade.data,
                    dataConcurso: dataConcurso.data,
                    dataFaixaEtaria: dataFaixaEtaria.data,
                    values: {
                        ...prevState.values,
                        part_conc: 0,
                        part_conc_nome: '',
                    },
                }
            });
            await this.fetchConcursos(value.conc_event);
        } catch (error) {
            console.error(error);
        }
    };

    concursoSelecionado = async (conc, value) => {
        try {
            this.handleChangeAutocomplete(value);
            const dataTemas = await api.get(`/admin/grafico/temas/${value.part_conc}`);;
            this.setState({
                dadosCarregadosConc: true,
                dataTemas: dataTemas.data,
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
            const eixo = id === 'grafico-etario' ? 'y' : 'x';
            const grafico = new Chart(newCanvas, {
                type: type,
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    title: {
                        display: false,
                    },
                    maintainAspectRatio: false,
                    indexAxis: eixo,
                },
            });
            return grafico;
        }
        return null;
    };

    render() {
        const { conc_event, conc_event_nome, part_conc, part_conc_nome } = this.state.values;
        const { listaEventos, listaConcursos, dadosCarregados, dadosCarregadosConc, selectBoxStyle } = this.state;
        const graphBox = {
            width: '22%',
            maxHeight: 240,
            height: 240,
            marginTop: '1.875rem',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.1)',
            padding: '36px',
            borderRadius: '10px',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            transform: 'scale(1)',
            '&:hover': {
                transform: 'scale(1.2)',
                zIndex: '100',
            },
        };
        const graphTitle = {
            fontSize: '12px',
            marginBottom: '20px',
            fontWeight: '700',
            color: '#ff5722',
            position: 'absolute',
            top: 0,
            marginTop: '10px',
        };

        return (
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        transform: '',
                        width: '100%',
                        marginTop: '1.875rem',
                        display: 'flex',
                        justifyContent: 'space-around',
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
                    <Autocomplete
                        id="cad-select-conc"
                        getOptionLabel={(listaConcursos) =>
                            `${listaConcursos.part_conc_nome}`
                        }
                        options={listaConcursos}
                        sx={selectBoxStyle}
                        isOptionEqualToValue={(option, value) =>
                            option.part_conc_nome === value.part_conc_nome
                        }
                        noOptionsText={'Nenhum concurso está disponível.'}
                        renderOption={(props, listaConcursos) => (
                            <Box component="li" {...props} key={listaConcursos.part_conc}>
                                {listaConcursos.part_conc_nome}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Concurso" variant="outlined" />
                        )}
                        onChange={(conc, values, select, option) => {
                            this.concursoSelecionado(conc, values, select, option);
                        }}
                        value={{
                            part_conc: part_conc,
                            part_conc_nome: part_conc_nome,
                        }}
                        disableClearable
                    />
                </Box>
                {dadosCarregados &&
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                marginTop: '1rem',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={graphBox}
                                id="grafico-cidade-place"
                            >
                                <Typography sx={graphTitle}>
                                    Análise Demográfica
                                </Typography>
                                <canvas id="grafico-cidade" />
                            </Box>
                            <Box
                                sx={graphBox}
                                id="grafico-concurso-place"
                            >
                                <Typography sx={graphTitle}>
                                    Análise de Tendência: Concursos
                                </Typography>
                                <canvas id="grafico-concurso" />
                            </Box>
                            <Box
                                sx={graphBox}
                                id="grafico-etario-place"
                            >
                                <Typography sx={graphTitle}>
                                    Análise Etária
                                </Typography>
                                <canvas id="grafico-etario" />
                            </Box>
                            {dadosCarregadosConc ?
                                <Box
                                    sx={graphBox}
                                    id="grafico-temas-place"
                                >
                                    <Typography sx={graphTitle}>
                                        Análise de Tendência: Temas
                                    </Typography>
                                    <canvas id="grafico-temas" />
                                </Box> :
                                <Box
                                    sx={graphBox}
                                    id="grafico-temas-place"
                                >
                                    <Typography sx={graphTitle}>
                                        Análise de Tendência: Temas
                                    </Typography>
                                    <Typography sx={{
                                        ...graphTitle,
                                        position: 'initial',
                                        textAlign: 'center'
                                    }}>
                                        Selecione o Concurso para carregar o gráfico.
                                    </Typography>
                                </Box>}
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                marginTop: '1rem',
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