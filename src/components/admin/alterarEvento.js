import React, { Component } from 'react';
import {
	TextField,
	Button,
	Box,
	Autocomplete,
	Modal,
	Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';

export class AlterarEvento extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			openConfirm: false,
			listaEventos: [],
			listaEstados: [],
			listaCidades: [],
			selectBoxStyle: { width: '45%', marginBottom: '2.625rem' },
			values: {
				event_id: 0,
				event_ed_nome: '',
				event_nome: '',
				event_nome_back: '',
				event_local: '',
				event_edicao: 0,
				event_edicao_back: 0,
				event_cidade: 0,
				event_cidade_nome: '',
				event_estado: 0,
				event_estado_nome: '',
				event_data: '',
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
			styleConfirm: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				border: '2px solid #000',
				boxShadow: 24,
				p: 4,
				borderRadius: '1.25rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			},
		};
		this.state.initialValues = { ...this.state.values };

		this.fetchEstados = this.fetchEstados.bind(this);
		this.fetchCidades = this.fetchCidades.bind(this);
		this.estadoSelecionado = this.estadoSelecionado.bind(this);
		this.cidadeSelecionada = this.cidadeSelecionada.bind(this);
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

	continue = async (e) => {
		const data = {
			...this.state.values,
		};
		const idEvento = this.state.values.event_id;

		delete data.event_id;
		delete data.event_ed_nome;

		if (!data.event_nome && !data.event_edicao) {
			delete data.event_edicao;
			delete data.event_nome;
		} else if (!data.event_nome) {
			data.event_nome = data.event_nome_back;
		} else if (!data.event_edicao) {
			data.event_edicao = data.event_edicao_back;
		}

		for (const key in data) {
			if (!data[key]) {
				delete data[key];
			}
		}

		try {
			const response = await api.put(
				'admin/evento/atualizar/' + idEvento,
				data
			);
			this.setState((prevState, props) => ({
				successMsg: {
					type: 'succcess',
					title: 'Sucesso',
					msg: response.data,
				},
				style: {
					...prevState.style,
					bgcolor: 'rgba(6, 68, 6, 0.8)',
					border: '2px solid #0F0',
				},
			}));
			this.handleOpen();
		} catch (error) {
			console.error(error);
			this.setState((prevState, props) => ({
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
			}));
			this.handleOpen();
		}
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
		this.fetchEventos();
	};

	handleOpenConfirm = () => {
		this.setState({ openConfirm: true });
	};

	handleCloseConfirm = () => {
		this.setState({ openConfirm: false });
	};

	deletar = async (e) => {
		e.preventDefault();

		const idEvento = this.state.values.event_id;

		try {
			const response = await api.delete('admin/evento/deletar/' + idEvento);
			this.setState((prevState, props) => ({
				successMsg: {
					type: 'succcess',
					title: 'Sucesso',
					msg: response.data,
				},
				style: {
					...prevState.style,
					bgcolor: 'rgba(6, 68, 6, 0.8)',
					border: '2px solid #0F0',
				},
			}));
			this.handleOpen();
		} catch (error) {
			console.error(error);
			this.setState((prevState, props) => ({
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
			}));
			this.handleOpen();
		}

		this.setState((prevState, props) => ({
			values: { ...prevState.initialValues },
		}));

		this.setState({ listaEventos: [] });
		this.fetchEventos();

		this.handleCloseConfirm();
	};

	async fetchEventos() {
		try {
			const response = await api.get('/lista/evento');
			this.setState({ listaEventos: response.data });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchEvento(event_id) {
		try {
			const response = await api.get('/admin/evento/buscar/' + event_id);
			const evento = {
				event_id: response.data.event_id,
				event_ed_nome: response.data.event_ed_nome,
				event_nome: response.data.event_nome,
				event_nome_back: response.data.event_nome,
				event_local: response.data.event_local,
				event_edicao: response.data.event_edicao,
				event_edicao_back: response.data.event_edicao,
				event_cidade: response.data.event_cidade,
				event_cidade_nome: response.data.cidade.cid_desc,
				event_estado: response.data.cidade.cid_estado,
				event_estado_nome: response.data.cidade.estado.est_desc,
				event_data: response.data.event_data,
			};
			this.setState({ values: evento });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchEstados() {
		try {
			const response = await api.get('/lista/estado');
			const estados = response.data.map((estado) => ({
				event_estado: estado.est_id,
				event_estado_nome: estado.est_desc,
			}));
			this.setState({ listaEstados: estados });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchCidades(event_estado) {
		try {
			const response = await api.get('/lista/cidade', {
				params: {
					estado: event_estado,
				},
			});
			const cidades = response.data.map((cidade) => ({
				event_cidade: cidade.cid_id,
				event_cidade_nome: cidade.cid_desc,
			}));
			this.setState({ listaCidades: cidades });
		} catch (error) {
			console.error(error);
		}
	}

	eventoSelecionado = async (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
			await this.fetchEvento(value.event_id);
			await this.fetchEstados();
			await this.fetchCidades(this.state.values.event_estado);
		} catch (error) {
			console.error(error);
		}
	};

	estadoSelecionado = async (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
			await this.fetchCidades(value.event_estado);
		} catch (error) {
			console.error(error);
		}
	};

	cidadeSelecionada = (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
		} catch (error) {
			console.error(error);
		}
	};

	//Lidar com a mudança
	handleChange = (input) => (e) => {
		this.setState((prevState, props) => ({
			values: { ...prevState.values, [input]: e.target.value },
		}));
	};

	handleChangeAutocomplete = (value) => {
		this.setState((prevState, props) => ({
			values: {
				...prevState.values,
				...value,
			},
		}));
	};

	render() {
		const {
			event_id,
			event_ed_nome,
			event_nome,
			event_edicao,
			event_local,
			event_data,
			event_cidade,
			event_cidade_nome,
			event_estado,
			event_estado_nome,
		} = this.state.values;
		const { listaEventos, listaEstados, listaCidades, selectBoxStyle } =
			this.state;

		return (
			<Box sx={{ width: '100%' }}>
				<Formik
					initialValues={{
						event_id,
						event_ed_nome,
						event_nome,
						event_edicao,
						event_local,
						event_data,
						event_cidade,
						event_cidade_nome,
						event_estado,
						event_estado_nome,
					}}
					validationSchema={Yup.object().shape({})}
					onSubmit={(values) => {
						this.continue();
					}}
				>
					{(props) => {
						const { handleChange, touched, errors, isValid, handleBlur } =
							props;

						return (
							<Form style={{ width: '100%' }}>
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
												`${listaEventos.event_ed_nome}`
											}
											options={listaEventos}
											sx={{ width: '95%', marginBottom: '2.625rem' }}
											isOptionEqualToValue={(option, value) =>
												option.event_ed_nome === value.event_ed_nome
											}
											noOptionsText={'Nenhum evento está disponível.'}
											renderOption={(props, listaEventos) => (
												<Box
													component="li"
													{...props}
													key={listaEventos.event_id}
												>
													{listaEventos.event_ed_nome}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Evento"
													variant="outlined"
												/>
											)}
											onChange={(event, value, select, option) => {
												this.eventoSelecionado(event, value);
											}}
											value={{
												event_id: event_id,
												event_ed_nome: event_ed_nome,
											}}
											disableClearable
										/>
									</Box>

									{event_id ? (
										<Box sx={{ width: '100%' }}>
											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-around',
												}}
											>
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<TextField
														sx={{ marginBottom: '2.625rem', width: '100%' }}
														id="event_nome"
														label="Nome do Evento"
														placeholder="Mega Campinas Anime Fest"
														variant="outlined"
														value={event_nome}
														onChange={handleChange}
														onChangeCapture={this.handleChange('event_nome')}
														onBlur={handleBlur}
														error={errors.event_nome && touched.event_nome}
														helperText={touched.event_nome && errors.event_nome}
													/>
												</Box>
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<TextField
														sx={{ marginBottom: '2.625rem', width: '100%' }}
														id="event_edicao"
														label="Edição"
														type="number"
														variant="outlined"
														value={event_edicao}
														onChange={handleChange}
														onChangeCapture={this.handleChange('event_edicao')}
														onBlur={handleBlur}
														error={errors.event_edicao && touched.event_edicao}
														helperText={
															touched.event_edicao && errors.event_edicao
														}
													/>
												</Box>
											</Box>

											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-around',
												}}
											>
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<TextField
														sx={{ marginBottom: '2.625rem', width: '100%' }}
														id="event_local"
														label="Local do Evento"
														placeholder="Liceu Salesiano"
														variant="outlined"
														value={event_local}
														onChange={handleChange}
														onChangeCapture={this.handleChange('event_local')}
														onBlur={handleBlur}
														error={errors.event_local && touched.event_local}
														helperText={
															touched.event_local && errors.event_local
														}
													/>
												</Box>
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<TextField
														sx={{ marginBottom: '2.625rem', width: '100%' }}
														id="event_data"
														label="Data do Evento"
														InputLabelProps={{ shrink: true }}
														type="date"
														variant="outlined"
														value={event_data}
														onChange={handleChange}
														onChangeCapture={this.handleChange('event_data')}
														onBlur={handleBlur}
														error={errors.event_data && touched.event_data}
														helperText={touched.event_data && errors.event_data}
													/>
												</Box>
											</Box>

											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-around',
												}}
											>
												<Autocomplete
													id="cad-select-estado"
													getOptionLabel={(listaEstados) =>
														`${listaEstados.event_estado_nome}`
													}
													options={listaEstados}
													sx={selectBoxStyle}
													isOptionEqualToValue={(option, value) =>
														option.event_estado_nome === value.event_estado_nome
													}
													noOptionsText={'Nenhum estado está disponível.'}
													renderOption={(props, listaEstados) => (
														<Box
															component="li"
															{...props}
															key={listaEstados.event_estado}
														>
															{listaEstados.event_estado_nome}
														</Box>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Estado"
															error={
																touched.event_estado_nome &&
																Boolean(errors.event_estado_nome)
															}
															helperText={
																touched.event_estado_nome &&
																errors.event_estado_nome
															}
															variant="outlined"
														/>
													)}
													onChange={(event, values, select, option) => {
														this.estadoSelecionado(
															event,
															values,
															select,
															option
														);
														handleChange(event, values, select, option);
													}}
													onBlur={handleBlur}
													value={{
														event_estado: event_estado,
														event_estado_nome: event_estado_nome,
													}}
													disableClearable
												/>

												<Autocomplete
													id="cad-select-cidade"
													getOptionLabel={(listaCidades) =>
														`${listaCidades.event_cidade_nome}`
													}
													options={listaCidades}
													sx={selectBoxStyle}
													isOptionEqualToValue={(option, value) =>
														option.event_cidade_nome === value.event_cidade_nome
													}
													noOptionsText={'Nenhuma cidade está disponível.'}
													renderOption={(props, listaCidades) => (
														<Box
															component="li"
															{...props}
															key={listaCidades.event_cidade}
														>
															{listaCidades.event_cidade_nome}
														</Box>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Cidade"
															error={
																touched.event_cidade_nome &&
																Boolean(errors.event_cidade_nome)
															}
															helperText={
																touched.event_cidade_nome &&
																errors.event_cidade_nome
															}
															variant="outlined"
														/>
													)}
													onChange={(event, values, select, option) => {
														this.cidadeSelecionada(
															event,
															values,
															select,
															option
														);
														handleChange(event, values, select, option);
													}}
													onBlur={handleBlur}
													value={{
														event_cidade: event_cidade,
														event_cidade_nome: event_cidade_nome,
													}}
													disableClearable
												/>
											</Box>

											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-around',
												}}
											>
												<Button
													sx={{ margin: '.625rem', width: '7.5rem' }}
													variant="contained"
													onClick={this.handleOpenConfirm}
												>
													Deletar
												</Button>
												<Button
													sx={{ margin: '.625rem', width: '7.5rem' }}
													type="submit"
													variant="contained"
													disabled={!isValid}
												>
													Salvar
												</Button>
											</Box>
										</Box>
									) : (
										''
									)}
								</Box>
							</Form>
						);
					}}
				</Formik>
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
				<Modal
					open={this.state.openConfirm}
					onClose={this.handleCloseConfirm}
					aria-labelledby="modal-confirm-title"
					aria-describedby="modal-confirm-description"
				>
					<Box sx={this.state.styleConfirm}>
						<Typography id="modal-confirm-title" variant="h5" component="h2">
							Deletar
						</Typography>
						<Typography id="modal-confirm-description" sx={{ mt: 2 }}>
							Você deseja realmente delertar o evento selecionado?
						</Typography>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-around',
							}}
						>
							<Button
								sx={{ margin: '.625rem', width: '7.5rem' }}
								variant="contained"
								onClick={this.handleCloseConfirm}
							>
								Cancelar
							</Button>
							<Button
								sx={{ margin: '.625rem', width: '7.5rem' }}
								variant="contained"
								onClick={this.deletar}
							>
								Confirmar
							</Button>
						</Box>
					</Box>
				</Modal>
			</Box>
		);
	}
}

export default AlterarEvento;
