import React, { Component } from 'react';
import {
    TextField,
    Box,
    Autocomplete,
    Modal,
    Typography,
} from '@mui/material';
import api from '../../services/api';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';
import { DataGrid } from '@mui/x-data-grid';


export class Checkin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listaEventos: [],
            listaConcursos: [],
            concursoSelecionado: false,
            selectBoxStyle: { width: '90%' },
            values: {
                conc_event: 0,
                conc_event_nome: '',
                part_conc: 0,
                part_conc_nome: '',
            },
            initialValues: {},
            successMsg: {},
            style: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'rgba(6, 68, 6, 0.8)',
                border: '2px solid #0F0',
                boxShadow: 24,
                p: 4,
                color: '#fff',
                borderRadius: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            },
            columns: [
                { field: 'id', headerName: 'ID', width: 90 },
                {
                    field: 'comp_nome_social',
                    headerName: 'Nome Social',
                    width: 250,
                },
                {
                    field: 'comp_nome',
                    headerName: 'Nome',
                    width: 250,
                },
                {
                    field: 'comp_cpf',
                    headerName: 'CPF',
                    width: 110,
                },
                {
                    field: 'comp_whats',
                    headerName: 'WhatsApp',
                    width: 110,
                },
                {
                    field: 'apres_nome',
                    headerName: 'Personagem / Música',
                    width: 150,
                },
                {
                    field: 'part_checkin',
                    headerName: 'Chekin',
                    type: 'boolean',
                    editable: true,
                },
            ],
            rowsInscr: [],
            rowsEsp: [],
        };

        this.state.initialValues = { ...this.state.values };

        this.fetchEventos = this.fetchEventos.bind(this);
        this.eventoSelecionado = this.eventoSelecionado.bind(this);
        this.fetchConcursos = this.fetchConcursos.bind(this);
        this.concursoSelecionado = this.concursoSelecionado.bind(this);
        this.fetchRows = this.fetchRows.bind(this);
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

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

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
        this.setState({ loadingConcurso: true });
        try {
            const response = await api.get('/lista/concurso/' + part_event);
            const concursos = response.data.map((concurso) => ({
                part_conc: concurso.conc_id,
                part_conc_nome: concurso.conc_nome,
            }));
            this.setState({ listaConcursos: [...concursos] });
        } catch (error) {
            console.error(error);
        }
        this.setState({ loadingConcurso: false });
    }

    async fetchRows(part_conc, espera) {
        this.setState({ loadingConcurso: true });
        try {
            const response = await api.get(`/staff/competidores/listar?concId=${part_conc}&espera=${espera}`);
            const rows = response.data.map((row) => ({
                id: row.comp_id,
                ...row
            }));
            return [...rows];
        } catch (error) {
            console.error(error);
        }
        this.setState({ loadingConcurso: false });
    }

    eventoSelecionado = async (event, value) => {
        try {
            this.handleChangeAutocomplete(value);
            await this.fetchConcursos(value.conc_event);
        } catch (error) {
            console.error(error);
        }
    };

    concursoSelecionado = async (event, value) => {
        try {
            this.handleChangeAutocomplete(value);
            const rowsInscr = await this.fetchRows(value.part_conc, false);
            const rowsEsp = await this.fetchRows(value.part_conc, true);
            this.setState({
                concursoSelecionado: Boolean(rowsInscr.length),
                rowsEsp: rowsEsp,
                rowsInscr: rowsInscr,
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleRowChange = async (params, event, details) => {
        const partId = params.row.part_id;

        console.log(params);

        try {
            const response = await api.put(`/staff/competidores/checkin/${partId}`);
            console.log(response);
        } catch (error) {
            if (!params.value) {
                console.error(error);
                this.setState((prevState, props) => {
                    return {
                        successMsg: {
                            type: 'error',
                            title: 'Erro na solicitação',
                            msg: error.response.data,
                        },
                        style: {
                            ...prevState.style,
                            bgcolor: 'rgba(138, 22, 22, 0.8)',
                            border: '2px solid #F00',
                        },
                    };
                });
                this.handleOpen();
                this.setState((prevState, props) => { // função que recebe o estado anterior e as props como parâmetros
                    return { // retorna um objeto com as alterações de estado
                        rowsInscr: [...prevState.rowsInscr],
                    };
                });
            }
        };
    }

    render() {
        const { conc_event, conc_event_nome, part_conc, part_conc_nome } = this.state.values;
        const { listaEventos, listaConcursos, selectBoxStyle, concursoSelecionado, columns, rowsInscr } =
            this.state;

        return (
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
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
                            renderOption={(props, listaEventos) => (
                                <Box component="li" {...props} key={listaEventos.part_conc}>
                                    {listaEventos.part_conc_nome}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Concurso" variant="outlined" />
                            )}
                            onChange={(event, values, select, option) => {
                                this.concursoSelecionado(event, values, select, option);
                            }}
                            value={{
                                part_conc: part_conc,
                                part_conc_nome: part_conc_nome,
                            }}
                            disableClearable
                        />
                    </Box>
                    {!concursoSelecionado ? (
                        ''
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '1.875rem',
                            }}
                        >
                            <DataGrid
                                rows={rowsInscr}
                                columns={columns}
                                onCellEditStop={this.handleRowChange}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    )}
                </Box>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={this.state.style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            {this.state.successMsg.title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {this.state.successMsg.msg}
                        </Typography>
                    </Box>
                </Modal>
            </Box>
        );
    }
}

export default Checkin;
