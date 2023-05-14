import React, { Component } from 'react';
import {
	TextField,
	Button,
	Box,
	Autocomplete,
	Modal,
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import UserService from '../../services/user';
import EventBus from '../../common/eventBus';
import { inputLoginErrors } from '../../styles/MuiTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export class AlterarUsuario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_usuario_senha: false,
			show_senha_confirm: false,
			open: false,
			listaUsuarios: [],
			listaCargos: [],
			selectBoxStyle: { width: '45%', marginBottom: '41px' },
			values: {
				usuario_id: 0,
				usuario_login: '',
				usuario_senha: '',
				usuario_senha_confirm: '',
				usuario_nome: '',
				usuario_cargo: 0,
				usuario_cargo_nome: '',
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

		this.fetchCargos = this.fetchCargos.bind(this);
		this.cargoSelecionado = this.cargoSelecionado.bind(this);
		this.fetchUsuario = this.fetchUsuario.bind(this);
		this.fetchUsuarios = this.fetchUsuarios.bind(this);
		this.usuarioSelecionado = this.usuarioSelecionado.bind(this);
		this.fetchUsuarios();
		this.fetchCargos();
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
		const data = {
			...this.state.values,
		};
		const idUsuario = this.state.values.usuario_id;

		delete data.usuario_id;
		delete data.usuario_login;

		for (const key in data) {
			if (!data[key]) {
				delete data[key];
			}
		}

		try {
			const response = await api.put(
				'admin/usuario/atualizar/' + idUsuario,
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
		this.fetchUsuarios();
	};

	reset = (e) => {
		e.preventDefault();
		this.setState({
			values: { ...this.state.initialValues },
		});
	};

	async fetchUsuarios() {
		try {
			const response = await api.get('/admin/usuario/listar');
			this.setState({ listaUsuarios: response.data });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchUsuario(usuario_id) {
		try {
			const response = await api.get('/usuario/buscar/' + usuario_id);
			const usuario = {
				usuario_id: usuario_id,
				usuario_login: response.data.usuario_login,
				usuario_nome: response.data.usuario_nome,
				usuario_cargo: response.data.cargo.cargo_id,
				usuario_cargo_nome: response.data.cargo.cargo_nome,
			};
			this.setState({ values: usuario });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchCargos() {
		try {
			const response = await api.get('/admin/lista/cargo');
			const cargos = response.data.map((cargo) => ({
				usuario_cargo: cargo.cargo_id,
				usuario_cargo_nome: cargo.cargo_nome,
			}));
			this.setState({ listaCargos: cargos });
		} catch (error) {
			console.error(error);
		}
	}

	cargoSelecionado = (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
		} catch (error) {
			console.error(error);
		}
	};

	usuarioSelecionado = async (event, value) => {
		try {
			this.handleChangeAutocomplete(value);
			this.fetchUsuario(value.usuario_id);
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

	handleClickShowPassword = (event, campo) => {
		this.setState((prevState) => ({ [campo]: !prevState[campo] }));
	};

	handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	render() {
		const {
			usuario_id,
			usuario_login,
			usuario_senha,
			usuario_senha_confirm,
			usuario_nome,
			usuario_cargo,
			usuario_cargo_nome,
		} = this.state.values;
		const {
			listaCargos,
			listaUsuarios,
			selectBoxStyle,
			show_usuario_senha,
			show_senha_confirm,
		} = this.state;

		return (
			<Box sx={{ width: '100%' }}>
				<Formik
					initialValues={{
						usuario_id,
						usuario_login,
						usuario_senha,
						usuario_senha_confirm,
						usuario_nome,
						usuario_cargo,
						usuario_cargo_nome,
					}}
					validationSchema={Yup.object().shape({
						usuario_senha: Yup.string().matches(
							passwordRules,
							'A senha deve conter pelo menos 5 caractéres, 1 letra maiúscula, 1 letra minúscula e um número.'
						),
						usuario_senha_confirm: Yup.string().oneOf(
							[Yup.ref('usuario_senha'), null],
							'As senhas não batem.'
						),
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
											marginTop: '30px',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Autocomplete
											id="cad-select-evento"
											getOptionLabel={(listaUsuarios) =>
												`${listaUsuarios.usuario_login}`
											}
											options={listaUsuarios}
											sx={{ width: '95%', marginBottom: '41px' }}
											isOptionEqualToValue={(option, value) =>
												option.usuario_login === value.usuario_login
											}
											noOptionsText={'Nenhum evento está disponível.'}
											renderOption={(props, listaUsuarios) => (
												<Box
													component="li"
													{...props}
													key={listaUsuarios.usuario_id}
												>
													{listaUsuarios.usuario_login}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Usuario Login"
													variant="outlined"
												/>
											)}
											onChange={(event, value, select, option) => {
												this.usuarioSelecionado(event, value);
											}}
											value={{
												usuario_id: usuario_id,
												usuario_login: usuario_login,
											}}
											disableClearable
										/>
									</Box>

									{usuario_id !== 0 ? (
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
														sx={{ marginBottom: '41px', width: '100%' }}
														id="usuario_nome"
														label="Nome"
														variant="outlined"
														value={usuario_nome}
														onChange={handleChange}
														onChangeCapture={this.handleChange('usuario_nome')}
														onBlur={handleBlur}
														error={errors.usuario_nome && touched.usuario_nome}
														helperText={
															touched.usuario_nome && errors.usuario_nome
														}
													/>
												</Box>
												<Autocomplete
													id="cad-select-cargo"
													getOptionLabel={(listaCargos) =>
														`${listaCargos.usuario_cargo_nome}`
													}
													options={listaCargos}
													sx={selectBoxStyle}
													isOptionEqualToValue={(option, value) =>
														option.usuario_cargo_nome ===
														value.usuario_cargo_nome
													}
													noOptionsText={'Nenhum estado está disponível.'}
													renderOption={(props, listaEstados) => (
														<Box
															component="li"
															{...props}
															key={listaEstados.usuario_cargo}
														>
															{listaEstados.usuario_cargo_nome}
														</Box>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Cargo"
															error={
																touched.usuario_cargo_nome &&
																Boolean(errors.usuario_cargo_nome)
															}
															helperText={
																touched.usuario_cargo_nome &&
																errors.usuario_cargo_nome
															}
															variant="outlined"
														/>
													)}
													onChange={(event, values, select, option) => {
														this.cargoSelecionado(
															event,
															values,
															select,
															option
														);
														handleChange(event, values, select, option);
													}}
													onBlur={handleBlur}
													value={{
														usuario_cargo: usuario_cargo,
														usuario_cargo_nome: usuario_cargo_nome,
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
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<FormControl
														sx={{ marginBottom: '41px', width: '100%' }}
														variant="outlined"
													>
														<InputLabel htmlFor="usuario_senha">
															Senha
														</InputLabel>
														<OutlinedInput
															id="usuario_senha"
															name="usuario_senha"
															type={show_usuario_senha ? 'text' : 'password'}
															placeholder="Entre com sua senha."
															value={usuario_senha}
															onChange={handleChange}
															onChangeCapture={this.handleChange(
																'usuario_senha'
															)}
															onBlur={handleBlur}
															endAdornment={
																<InputAdornment position="end">
																	<IconButton
																		aria-label="toggle password visibility"
																		onClick={(e) => {
																			this.handleClickShowPassword(
																				e,
																				'show_usuario_senha'
																			);
																		}}
																		onMouseDown={this.handleMouseDownPassword}
																	>
																		{show_usuario_senha ? (
																			<VisibilityOff />
																		) : (
																			<Visibility />
																		)}
																	</IconButton>
																</InputAdornment>
															}
															error={
																errors.usuario_senha && touched.usuario_senha
															}
															label="Senha"
														/>
													</FormControl>
													{errors.usuario_senha && touched.usuario_senha && (
														<Box sx={inputLoginErrors}>
															{errors.usuario_senha}
														</Box>
													)}
												</Box>
												<Box
													sx={{
														width: '45%',
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
													<FormControl
														variant="outlined"
														sx={{ marginBottom: '41px', width: '100%' }}
													>
														<InputLabel htmlFor="usuario_senha_confirm">
															Confirme a Senha
														</InputLabel>
														<OutlinedInput
															id="usuario_senha_confirm"
															name="usuario_senha_confirm"
															type={show_senha_confirm ? 'text' : 'password'}
															placeholder="Entre com sua senha."
															value={values.usuario_senha_confirm}
															onChange={handleChange}
															onChangeCapture={this.handleChange(
																'usuario_senha_confirm'
															)}
															onBlur={handleBlur}
															fullWidth
															endAdornment={
																<InputAdornment position="end">
																	<IconButton
																		aria-label="toggle password visibility"
																		onClick={(e) => {
																			this.handleClickShowPassword(
																				e,
																				'show_senha_confirm'
																			);
																		}}
																		onMouseDown={this.handleMouseDownPassword}
																	>
																		{show_senha_confirm ? (
																			<VisibilityOff />
																		) : (
																			<Visibility />
																		)}
																	</IconButton>
																</InputAdornment>
															}
															error={
																errors.usuario_senha_confirm &&
																touched.usuario_senha_confirm
															}
															label="Confirme a Senha"
														/>
													</FormControl>
													{errors.usuario_senha_confirm &&
														touched.usuario_senha_confirm && (
															<Box sx={inputLoginErrors}>
																{errors.usuario_senha_confirm}
															</Box>
														)}
												</Box>
											</Box>

											<Box
												sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-around',
												}}
											></Box>

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
			</Box>
		);
	}
}

export default AlterarUsuario;
