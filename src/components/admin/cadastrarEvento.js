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

export class CadastrarEvento extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			listaEstados: [],
			listaCidades: [],
			selectBoxStyle: { width: '45%', marginBottom: '41px' },
			values: {
				event_nome: '',
				event_local: '',
				event_edicao: 0,
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
				borderRadius: '20px',
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
		this.fetchEstados();
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

	continue = async (e) => {
		const data = this.state.values;
		try {
			const response = await api.post('admin/evento/criar', data);
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
			this.handleOpen();
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
			this.handleOpen();
		}
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	reset = (e) => {
		e.preventDefault();
		this.setState({
			values: { ...this.state.initialValues },
		});
	};

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
		this.setState({
			values: { ...this.state.values, [input]: e.target.value },
		});
	};

	handleChangeAutocomplete = (value) => {
		this.setState({
			values: {
				...this.state.values,
				...value,
			},
		});
	};

	render() {
		const {
			event_nome,
			event_edicao,
			event_local,
			event_data,
			event_cidade,
			event_cidade_nome,
			event_estado,
			event_estado_nome,
		} = this.state.values;
		const { listaEstados, listaCidades, selectBoxStyle } = this.state;

		return (
			<Box sx={{ width: '100%' }}>
				<Formik
					initialValues={{
						event_nome,
						event_edicao,
						event_local,
						event_data,
						event_cidade,
						event_cidade_nome,
						event_estado,
						event_estado_nome,
					}}
					validationSchema={Yup.object().shape({
						event_nome: Yup.string()
							.required('Campo requerido.')
							.min(8, 'Deve conter no mínimo 8 caracteres.'),
						event_local: Yup.string()
							.required('Campo requerido.')
							.min(3, 'Deve conter no mínimo 3 caracteres.'),
						event_edicao: Yup.number()
							.min(1, 'Edição inválida.')
							.required('Campo requerido.'),
						event_data: Yup.date()
							.min(
								new Date('1900-01-01'),
								'A data não pode ser menor que 01/01/1900'
							)
							.required('Campo requerido.'),
					})}
					onSubmit={(values) => {
						this.continue();
					}}
				>
					{(props) => {
						const {
							values,
							handleChange,
							touched,
							errors,
							isValid,
							handleBlur,
						} = props;

						return (
							<Form style={{ width: '100%' }}>
								<Box
									sx={{
										width: '100%',
										marginTop: '30px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
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
												sx={{ marginBottom: '41px', width: '100%' }}
												id="event_nome"
												label="Nome do Evento"
												placeholder="Mega Campinas Anime Fest"
												variant="outlined"
												value={values.event_nome}
												onChange={handleChange}
												onChangeCapture={this.handleChange('event_nome')}
												onBlur={handleBlur}
												error={errors.event_nome && touched.event_nome}
												helperText={touched.event_nome && errors.event_nome}
												required
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
												sx={{ marginBottom: '41px', width: '100%' }}
												id="event_edicao"
												label="Edição"
												type="number"
												variant="outlined"
												value={values.event_edicao}
												onChange={handleChange}
												onChangeCapture={this.handleChange('event_edicao')}
												onBlur={handleBlur}
												error={errors.event_edicao && touched.event_edicao}
												helperText={touched.event_edicao && errors.event_edicao}
												required
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
												sx={{ marginBottom: '41px', width: '100%' }}
												id="event_local"
												label="Local do Evento"
												placeholder="Liceu Salesiano"
												variant="outlined"
												value={values.event_local}
												onChange={handleChange}
												onChangeCapture={this.handleChange('event_local')}
												onBlur={handleBlur}
												error={errors.event_local && touched.event_local}
												helperText={touched.event_local && errors.event_local}
												required
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
												sx={{ marginBottom: '41px', width: '100%' }}
												id="event_data"
												label="Data do Evento"
												InputLabelProps={{ shrink: true }}
												type="date"
												variant="outlined"
												value={values.event_data}
												onChange={handleChange}
												onChangeCapture={this.handleChange('event_data')}
												onBlur={handleBlur}
												error={errors.event_data && touched.event_data}
												helperText={touched.event_data && errors.event_data}
												required
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
													required
													variant="outlined"
												/>
											)}
											onChange={(event, values, select, option) => {
												this.estadoSelecionado(event, values, select, option);
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
													required
													variant="outlined"
												/>
											)}
											onChange={(event, values, select, option) => {
												this.cidadeSelecionada(event, values, select, option);
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
											sx={{ margin: '10px', width: '120px' }}
											variant="contained"
											onClick={this.reset}
										>
											Limpar
										</Button>
										<Button
											sx={{ margin: '10px', width: '120px' }}
											type="submit"
											variant="contained"
											disabled={!isValid}
										>
											Salvar
										</Button>
									</Box>
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
			</Box>
		);
	}
}

export default CadastrarEvento;
