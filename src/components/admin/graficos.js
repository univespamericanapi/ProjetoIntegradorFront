import Chart from 'chart.js/auto';
import React, { Component } from 'react';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';
import api from '../../services/api';
import { Autocomplete, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

export class Graficos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaEventos: [],
            listaConcursos: [],
            dataConcurso: {},
            dataCidade: {},
            dataFaixaEtaria: {},
            dataVagas: {},
            dataFrequencia: {},
            dataTemas: {},
            dataUltimos: {},
            dataLoading: false,
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

        this.intervalo = setInterval(this.testFunction, 10000);
    }

    testFunction() {
        const agora = new Date();
        const hora = agora.getHours();
        const minutos = agora.getMinutes();
        const segundos = agora.getSeconds();

        console.log(`A hora atual é: ${hora}:${minutos}:${segundos}`);
    }

    componentWillUnmount() {
        clearInterval(this.intervalo); // Limpa o intervalo quando o componente é desmontado
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
                "line"
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

        if (prevState.dataFrequencia !== this.state.dataFrequencia) {
            this.criarGrafico(
                this.state.dataFrequencia,
                "grafico-frequencia",
                "grafico-frequencia-place",
                "bar"
            );
        }

        if (prevState.dataVagas !== this.state.dataVagas) {
            this.criarVagas(this.state.dataVagas);
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
            this.setState((prevState, props) => {
                return {
                    dataLoading: true,
                    dadosCarregados: false,
                    dadosCarregadosConc: false,
                };
            });
            this.handleChangeAutocomplete(value);
            const dataCidade = await api.get(`/admin/grafico/cidade/${value.conc_event}`);
            const dataConcurso = await api.get(`/admin/grafico/concurso/${value.conc_event}`);
            const dataFrequencia = await api.get(`/admin/grafico/frequencia/${value.conc_event}`);
            const dataFaixaEtaria = await api.get(`/admin/grafico/faixas-etarias/${value.conc_event}`);
            const dataVagas = await api.get(`/admin/grafico/vagas/${value.conc_event}`);
            const dataUltimos = await api.get(`/admin/grafico/ultimos/${value.conc_event}`);
            await this.fetchConcursos(value.conc_event);
            this.setState((prevState, props) => {
                return {
                    dadosCarregados: true,
                    dataLoading: false,
                    dataCidade: dataCidade.data,
                    dataConcurso: dataConcurso.data,
                    dataFrequencia: dataFrequencia.data,
                    dataFaixaEtaria: dataFaixaEtaria.data,
                    dataVagas: dataVagas.data,
                    dataTemas: null,
                    dataUltimos: dataUltimos.data,
                    values: {
                        ...prevState.values,
                        part_conc: 0,
                        part_conc_nome: '',
                    },
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    concursoSelecionado = async (conc, value) => {
        try {
            this.handleChangeAutocomplete(value);
            const dataTemas = await api.get(`/admin/grafico/temas/${value.part_conc}`);
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
            const eixo = id === 'grafico-temas' ? 'y' : 'x';
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

    criarVagas = (data) => {
        const restantePlace = document.getElementById("vagas-restantes");
        const restanteTable = document.getElementById("vagas-restantes-table");
        const cadastradosPlace = document.getElementById("vagas-cadastrados");
        const cadastradosTable = document.getElementById("vagas-cadastrados-table");

        restantePlace.removeChild(restanteTable);
        cadastradosPlace.removeChild(cadastradosTable);

        const newRestanteTable = document.createElement('div');
        const newCadastradosTable = document.createElement('div');
        newRestanteTable.id = "vagas-restantes-table";
        newCadastradosTable.id = "vagas-cadastrados-table";

        let innerHtml = "";
        data.map(concurso =>
            innerHtml += `<p style="text-align: center; margin: 10px; font-size: 12px; color: #572d7f;">
            <span style="font-weight: 700;">${concurso.nome}</span> = ${concurso.restantes}
            </p>`
        );
        newRestanteTable.innerHTML = innerHtml;

        innerHtml = "";
        data.map(concurso =>
            innerHtml += `<p style="text-align: center; margin: 10px; font-size: 12px; color: #572d7f;">
            <span style="font-weight: 700;">${concurso.nome}</span> = ${concurso.atual}
            </p>`
        );
        newCadastradosTable.innerHTML = innerHtml;

        restantePlace.appendChild(newRestanteTable);
        cadastradosPlace.appendChild(newCadastradosTable);
    };

    render() {
        const {
            conc_event,
            conc_event_nome,
            part_conc,
            part_conc_nome
        } = this.state.values;
        const {
            listaEventos,
            listaConcursos,
            dataLoading,
            dadosCarregados,
            dadosCarregadosConc,
            dataUltimos,
            selectBoxStyle
        } = this.state;
        const graphBox = {
            maxWidth: 260,
            maxHeight: 260,
            width: '100%',
            height: '100%',
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
        const dataBox = {
            maxWidth: 260,
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.1)',
            padding: '36px',
            borderRadius: '10px',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
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
                        marginTop: '.5rem',
                        marginBottom: '1.875rem',
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
                {dataLoading &&
                    <Box sx={{
                        width: '100%',
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    >
                        <CircularProgress color='primary' size='80px'></CircularProgress>
                    </Box>
                }
                {dadosCarregados &&
                    <Box sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        gridTemplateRows: '1fr 1fr 1fr 1fr',
                        gap: '50px',
                        placeItems: 'center',
                    }}
                    >
                        <Box
                            sx={{
                                ...graphBox,
                                gridArea: '1 / 1 / 2 / 2',
                            }}
                            title="Quantidade de participante por cidade do evento selecionado."
                            id="grafico-cidade-place"
                        >
                            <Typography sx={graphTitle}>
                                Análise Demográfica
                            </Typography>
                            <canvas id="grafico-cidade" />
                        </Box>
                        <Box
                            sx={{
                                ...graphBox,
                                gridArea: '1 / 2 / 2 / 3',
                            }}
                            title="Quantidade de participante por concurso do evento selecionado."
                            id="grafico-concurso-place"
                        >
                            <Typography sx={graphTitle}>
                                Análise de Tendência: Concursos
                            </Typography>
                            <canvas id="grafico-concurso" />
                        </Box>
                        <Box
                            sx={{
                                ...graphBox,
                                gridArea: '1 / 3 / 2 / 4',
                            }}
                            title="Quantidade de participante por faixa etária do evento selecionado."
                            id="grafico-etario-place"
                        >
                            <Typography sx={graphTitle}>
                                Análise Etária
                            </Typography>
                            <canvas id="grafico-etario" />
                        </Box>
                        <Box
                            sx={{
                                ...graphBox,
                                gridArea: '1 / 4 / 2 / 5',
                            }}
                            title="Quantidade de participante por tema do concurso e do evento selecionado."
                            id="grafico-temas-place"
                        >
                            <Typography sx={graphTitle}>
                                Análise de Tendência: Temas
                            </Typography>
                            <canvas id="grafico-temas" />
                            {dadosCarregadosConc ? null :
                                <Box sx={{
                                    display: 'flex',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Typography sx={{
                                        ...graphTitle,
                                        position: 'initial',
                                        textAlign: 'center'
                                    }}>
                                        Selecione o Concurso para carregar o gráfico.
                                    </Typography>
                                </Box>
                            }
                        </Box>
                        <Box
                            sx={{
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
                                width: '100%',
                                height: '100%',
                                gridArea: '2 / 1 / 4 / 4',
                            }}
                            title="Quantidade de participantes e a quantidade de vezes que frequentou o evento."
                            id="grafico-frequencia-place"
                        >
                            <Typography sx={graphTitle}>
                                Análise de Comportamento
                            </Typography>
                            <canvas id="grafico-frequencia" />
                        </Box>
                        <Box
                            sx={{
                                ...dataBox,
                                gridArea: '2 / 4 / 3 / 5',
                            }}
                            id="vagas-restantes"
                        >
                            <Typography sx={graphTitle}>
                                Vagas dos concursos: restantes
                            </Typography>
                            <div id="vagas-restantes-table"></div>
                        </Box>
                        <Box
                            sx={{
                                ...dataBox,
                                gridArea: '3 / 4 / 4 / 5',
                            }}
                            id="vagas-cadastrados"
                        >
                            <Typography sx={graphTitle}>
                                Vagas dos concursos: cadatrados
                            </Typography>
                            <div id="vagas-cadastrados-table"></div>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                position: 'relative',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(113, 113, 113, 0.1)',
                                padding: '20px',
                                paddingTop: '42px',
                                borderRadius: '10px',
                                boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease',
                                width: '100%',
                                height: 260,
                                overflowY: 'auto',
                                gridArea: '4 / 1 / 5 / 5',
                            }}
                            id="ultimos-cadastros"
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    position: 'absolute',
                                    top: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: 40,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(113, 113, 113, 0.3)'
                                }}
                            >
                                <Typography sx={graphTitle}>
                                    Últimos Cadastros
                                </Typography>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="uma tabela com os ultimos cadastros.">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id Participação</TableCell>
                                            <TableCell align='right'>Nome</TableCell>
                                            <TableCell align='right'>Concurso</TableCell>
                                            <TableCell align='right'>Apresentação</TableCell>
                                            <TableCell align='right'>Origem</TableCell>
                                            <TableCell align='right'>WhatsApp</TableCell>
                                            <TableCell align='right'>Data Nascimento</TableCell>
                                            <TableCell align='right'>Cidade / Estado</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody component="th" scope='row'>
                                        {dataUltimos.map((row) => (
                                            <TableRow
                                                key={row.idParticipacao}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.idParticipacao}
                                                </TableCell>
                                                <TableCell align="right">{row.nomeCompetidor}</TableCell>
                                                <TableCell align="right">{row.concurso}</TableCell>
                                                <TableCell align="right">{row.apresentacao}</TableCell>
                                                <TableCell align="right">{row.origemApresentacao}</TableCell>
                                                <TableCell align="right">{row.whatsapp}</TableCell>
                                                <TableCell align="right">{row.dataNascimento}</TableCell>
                                                <TableCell align="right">{row.cidade}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                }
            </Box>
        );
    };
}