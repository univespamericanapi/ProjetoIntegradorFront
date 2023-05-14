import React, { Component } from 'react';
import {
	TextField,
	Button,
	Box,
	Autocomplete,
	Modal,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import api from '../../services/api';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';

export class ConfigurarConcurso extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			listaEventos: [],
			listaConcursos: [],
			concursosLength: 0,
			selectBoxStyle: { width: '90%' },
			values: {
				conc_event: 0,
				conc_event_nome: '',
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
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
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

	save = async (event, value) => {
		event.preventDefault();
		const listaConcursos = this.state.listaConcursos;
		const data = listaConcursos.find((concurso) => concurso.conc_id === value);
		data.conc_limit_checkin = data.conc_limit_inscr;
		try {
			const response = await api.put(
				'admin/concurso/atualizar/' + data.conc_id,
				data
			);
			this.setState({
				successMsg: {
					type: 'succcess',
					title: 'Sucesso',
					msg: response.data,
				},
				style: {
					...this.state.style,
					bgcolor: 'rgba(6, 68, 6, 0.8)',
					border: '2px solid #0F0',
				},
			});
		} catch (error) {
			console.error(error);
			this.setState({
				successMsg: {
					type: 'error',
					title: 'Erro na solicitação',
					msg: error.response.data,
				},
				style: {
					...this.state.style,
					bgcolor: 'rgba(138, 22, 22, 0.8)',
					border: '2px solid #F00',
				},
			});
		}
		this.handleOpen();
	};

	saveAll = async (event) => {
		event.preventDefault();
		const listaConcursos = this.state.listaConcursos;
		listaConcursos.forEach(async (data) => {
			data.conc_limit_checkin = data.conc_limit_inscr;
			try {
				const response = await api.put(
					'admin/concurso/atualizar/' + data.conc_id,
					data
				);
				this.setState({
					successMsg: {
						type: 'succcess',
						title: 'Sucesso',
						msg: response.data,
					},
					style: {
						...this.state.style,
						bgcolor: 'rgba(6, 68, 6, 0.8)',
						border: '2px solid #0F0',
					},
				});
			} catch (error) {
				console.error(error);
				this.setState({
					successMsg: {
						type: 'error',
						title: 'Erro na solicitação',
						msg: error.response.data,
					},
					style: {
						...this.state.style,
						bgcolor: 'rgba(138, 22, 22, 0.8)',
						border: '2px solid #F00',
					},
				});
			}
		});
		this.handleOpen();
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	//Lidar com a mudança
	handleChange = (event, value) => {
		const infos = event.target.name.split('+');
		const listaConcursos = [...this.state.listaConcursos];
		const indice = listaConcursos.findIndex(
			(concurso) => concurso.conc_id === Number(infos[1])
		);
		listaConcursos[indice][infos[0]] = Number(event.target.value);
		this.setState({ listaConcursos });
	};

	handleChangeCheckbox = (event, value) => {
		const infos = event.target.name.split('+');
		const listaConcursos = [...this.state.listaConcursos];
		const indice = listaConcursos.findIndex(
			(concurso) => concurso.conc_id === Number(infos[1])
		);
		listaConcursos[indice][infos[0]] = value;
		this.setState({ listaConcursos });
	};

	handleChangeAutocomplete = (value) => {
		this.setState({
			values: {
				...this.state.values,
				...value,
			},
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

	async fetchConcursos(conc_event) {
		try {
			const response = await api.get('/admin/concurso/buscar/' + conc_event);
			// eslint-disable-next-line array-callback-return
			const concursos = response.data.map((concurso) => ({
				...concurso,
			}));
			this.pushListaConcurso(concursos);
			this.setState({
				concursosLength: concursos.length,
			});
		} catch (error) {
			console.error(error);
		}
	}

	pushListaConcurso = (concursos) => {
		this.state.listaConcursos.push(...concursos);
	};

	eventoSelecionado = async (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
			await this.fetchConcursos(value.conc_event);
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		const { conc_event, conc_event_nome } = this.state.values;
		const { listaEventos, listaConcursos, selectBoxStyle, concursosLength } =
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
					{concursosLength <= 0 ? (
						''
					) : (
						<Box>
							<TableContainer>
								<Table
									sx={{ minWidth: 650, width: '100%' }}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow>
											<TableCell sx={{ padding: '.5rem' }}>Id</TableCell>
											<TableCell sx={{ padding: '.5rem' }} align="right">
												Nome
											</TableCell>
											<TableCell sx={{ padding: '.5rem' }} align="right">
												Limite de Inscritos
											</TableCell>
											<TableCell sx={{ padding: '.5rem' }} align="right">
												Limite de Espera
											</TableCell>
											<TableCell sx={{ padding: '.5rem' }} align="right">
												Ativo?
											</TableCell>
											<TableCell sx={{ padding: '.5rem' }} align="right">
												Salvar
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listaConcursos.map((row) => (
											<TableRow
												key={row.conc_id}
												sx={{
													'&:last-child td, &:last-child th': {
														border: 0,
													},
												}}
											>
												<TableCell
													sx={{ padding: '.5rem' }}
													component="th"
													scope="row"
												>
													{row.conc_id}
												</TableCell>
												<TableCell sx={{ padding: '.5rem' }} align="right">
													{row.conc_nome}
												</TableCell>
												<TableCell sx={{ padding: '.5rem' }} align="right">
													<TextField
														sx={{ width: '3.125rem' }}
														name={'conc_limit_inscr+' + row.conc_id}
														id={'conc_limit_inscr+' + row.conc_id}
														type="number"
														variant="standard"
														value={row.conc_limit_inscr}
														onChange={this.handleChange}
													/>
												</TableCell>
												<TableCell sx={{ padding: '.5rem' }} align="right">
													<TextField
														sx={{ width: '3.125rem' }}
														name={'conc_limit_espera+' + row.conc_id}
														id={'conc_limit_espera+' + row.conc_id}
														type="number"
														variant="standard"
														value={row.conc_limit_espera}
														onChange={this.handleChange}
													/>
												</TableCell>
												<TableCell sx={{ padding: '.5rem' }} align="right">
													<FormControlLabel
														name={'conc_ativo+' + row.conc_id}
														id={'conc_ativo+' + row.conc_id}
														control={<Checkbox />}
														onChange={this.handleChangeCheckbox}
														checked={row.conc_ativo}
													/>
												</TableCell>
												<TableCell sx={{ padding: '.5rem' }} align="right">
													<Button
														variant="contained"
														onClick={(e) => {
															this.save(e, row.conc_id);
														}}
													>
														<CheckIcon />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-around',
								}}
							>
								<Button
									sx={{ margin: '1.25rem' }}
									variant="contained"
									onClick={(e) => {
										this.saveAll(e);
									}}
								>
									Salvar Tudo
								</Button>
							</Box>
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

export default ConfigurarConcurso;
