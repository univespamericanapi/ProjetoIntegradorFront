import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	loginBox,
	inputLoginBox,
	inputLoginErrors,
	loginErrors,
} from '../styles/MuiTheme';
import { withRouter } from '../common/withRouter';
import AuthService from '../services/auth';

export class Login extends Component {
	constructor(props) {
		super(props);

		this.handleLogin = this.handleLogin.bind(this);
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
		this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);

		this.state = {
			showPassword: false,
			username: '',
			password: '',
			loading: false,
			message: '',
		};
	}

	handleClickShowPassword = () =>
		this.setState((prevState) => ({ showPassword: !prevState.showPassword }));

	handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	handleLogin(values) {
		AuthService.login(values.usuario_login, values.usuario_senha).then(
			() => {
				this.props.router.navigate('/profile');
				window.location.reload();
			},
			(error) => {
				console.error(error.response.data);
				const resMessage =
					error.response.data || error.message || error.toString();

				this.setState({
					loading: false,
					message: resMessage,
				});
			}
		);
	}

	render() {
		const { showPassword } = this.state;

		return (
			<Formik
				initialValues={{ usuario_login: '', usuario_senha: '' }}
				validationSchema={Yup.object().shape({
					usuario_login: Yup.string().required('Login é requerido.'),
					usuario_senha: Yup.string()
						.required('Senha é requerida.')
						.min(5, 'A senha contém no mínimo 5 caracteres.'),
				})}
				onSubmit={(values) => {
					this.handleLogin(values);
				}}
			>
				{(props) => {
					const {
						values,
						touched,
						errors,
						isValid,
						handleChange,
						handleBlur,
						handleSubmit,
					} = props;

					return (
						<Box sx={loginBox}>
							<form onSubmit={handleSubmit}>
								<Box>
									<FormControl variant="standard" sx={inputLoginBox}>
										<InputLabel htmlFor="usuario_login">Login</InputLabel>
										<Input
											id="usuario_login"
											name="usuario_login"
											type={'text'}
											placeholder="Entre com seu Login."
											value={values.usuario_login}
											onChange={handleChange}
											onBlur={handleBlur}
											fullWidth
											error={errors.usuario_login && touched.usuario_login}
										/>
									</FormControl>
									{errors.usuario_login && touched.usuario_login && (
										<Box sx={inputLoginErrors}>{errors.usuario_login}</Box>
									)}
								</Box>

								<Box>
									<FormControl variant="standard" sx={inputLoginBox}>
										<InputLabel htmlFor="usuario_senha">Senha</InputLabel>
										<Input
											id="usuario_senha"
											name="usuario_senha"
											type={showPassword ? 'text' : 'password'}
											placeholder="Entre com sua senha."
											value={values.usuario_senha}
											onChange={handleChange}
											onBlur={handleBlur}
											fullWidth
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={this.handleClickShowPassword}
														onMouseDown={this.handleMouseDownPassword}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											error={errors.usuario_senha && touched.usuario_senha}
										/>
									</FormControl>
									{errors.usuario_senha && touched.usuario_senha && (
										<Box sx={inputLoginErrors}>{errors.usuario_senha}</Box>
									)}
								</Box>

								<Box>
									<Button
										type="submit"
										variant="contained"
										fullWidth
										disabled={!isValid}
									>
										Login
									</Button>
								</Box>
								<Box sx={loginErrors}>
									{this.state.message && <div>{this.state.message}</div>}
								</Box>
							</form>
						</Box>
					);
				}}
			</Formik>
		);
	}
}

export default withRouter(Login);
