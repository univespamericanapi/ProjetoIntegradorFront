import React, { Component } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import validaCpf from '../../utils/validaCpf';

const phoneRegExp = /^(\(\d{2}\)\s)?\d{4,5}-?\d{4,5}$/;
const cpfRegExp = /^\d{3}.?\d{3}.?\d{3}-?\d{2}/;

export class InformacaoPessoal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listaEstados: [],
			listaCidades: [],
			selectBoxStyle: {
				width: { xs: '100%', md: '45%' },
				marginBottom: '2.625rem',
			},
		};
		this.fetchEstados = this.fetchEstados.bind(this);
		this.fetchCidades = this.fetchCidades.bind(this);
		this.estadoSelecionado = this.estadoSelecionado.bind(this);
		this.cidadeSelecionada = this.cidadeSelecionada.bind(this);
		this.fetchEstados();
	}

	continue = (e) => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	async fetchEstados() {
		try {
			const response = await api.get('/lista/estado');
			const estados = response.data.map((estado) => ({
				comp_estado: estado.est_id,
				comp_estado_nome: estado.est_desc,
			}));
			this.setState({ listaEstados: estados });
		} catch (error) {
			console.error(error);
		}
	}

	async fetchCidades(comp_estado) {
		try {
			const response = await api.get('/lista/cidade', {
				params: {
					estado: comp_estado,
				},
			});
			const cidades = response.data.map((cidade) => ({
				comp_cidade: cidade.cid_id,
				comp_cidade_nome: cidade.cid_desc,
			}));
			this.setState({ listaCidades: cidades });
		} catch (error) {
			console.error(error);
		}
	}

	estadoSelecionado = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
			await this.fetchCidades(value.comp_estado);
		} catch (error) {
			console.log(error);
		}
	};

	cidadeSelecionada = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
		} catch (error) {
			console.log(error);
		}
	};

	handleChangeCpfMask = (e, handleChange) => {
		const value = e.target.value
			.replace(/\D/g, '') // remove caracteres não numéricos
			.replace(/(\d{3})(\d)/, '$1.$2') // insere o primeiro ponto
			.replace(/(\d{3})(\d)/, '$1.$2') // insere o segundo ponto
			.replace(/(\d{3})(\d{1,2})/, '$1-$2') // insere o traço
			.replace(/(-\d{2})\d$/, '$1'); // remove os dígitos excedentes
		e.target.value = value;
		handleChange(e);
	};

	handleChangeWhatsMask = (e, handleChange) => {
		const value = e.target.value
			.replace(/\D/g, '') // remove caracteres não numéricos
			.replace(/(\d{2})(\d)/, '($1) $2') // insere o parêntese e espaço
			.replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // insere o traços
		console.log(value);
		e.target.value = value;
		handleChange(e);
	};

	render() {
		const {
			comp_nome,
			comp_nome_social,
			comp_email,
			comp_whats,
			comp_cpf,
			comp_nasc,
			comp_estado,
			comp_estado_nome,
			comp_cidade,
			comp_cidade_nome,
		} = this.props.values;
		const { listaEstados, listaCidades, selectBoxStyle } = this.state;

		return (
			<React.Fragment>
				<Formik
					initialValues={{
						comp_nome,
						comp_nome_social,
						comp_email,
						comp_whats,
						comp_cpf,
						comp_nasc,
						comp_estado,
						comp_estado_nome,
						comp_cidade,
						comp_cidade_nome,
					}}
					validationSchema={Yup.object().shape({
						comp_nome: Yup.string()
							.required('Campo requerido.')
							.min(10, 'Deve conter no mínimo 10 caracteres.'),
						comp_whats: Yup.string()
							.required('Campo requerido.')
							.matches(
								phoneRegExp,
								'Deveser um número de telefone válido e somente dígitos ((19) 99999-9999).'
							),
						comp_nome_social: Yup.string(),
						comp_cpf: Yup.string()
							.required('Campo requerido.')
							.matches(
								cpfRegExp,
								'Deveser um número de CPF válido e somente dígitos (99999999999).'
							)
							.test('test-invalid-cpf', 'CPF inválido', (cpf) =>
								validaCpf(cpf)
							),
						comp_email: Yup.string()
							.required('Campo requerido.')
							.email('Deve ser digitado um e-mail válido.'),
						comp_nasc: Yup.date()
							.max(
								new Date().toLocaleString('en-CA').split(',')[0],
								'A data não pode ser maior que o dia de hoje.'
							)
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
											display: 'flex',
											justifyContent: 'space-around',
											flexDirection: { xs: 'column', md: 'row' },
										}}
									>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_nome"
												label="Nome Completo"
												placeholder="Entre com seu nome completo"
												variant="outlined"
												value={values.comp_nome}
												onChange={handleChange}
												onChangeCapture={this.props.handleChange('comp_nome')}
												onBlur={handleBlur}
												error={errors.comp_nome && touched.comp_nome}
												helperText={touched.comp_nome && errors.comp_nome}
												required
											/>
										</Box>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_whats"
												label="Whatsapp"
												placeholder="Entre com o número do seu Whatsapp, somente números."
												variant="outlined"
												value={values.comp_whats}
												onChange={(e) => {
													this.handleChangeWhatsMask(e, handleChange);
												}}
												onChangeCapture={this.props.handleChange('comp_whats')}
												onBlur={handleBlur}
												error={errors.comp_whats && touched.comp_whats}
												helperText={touched.comp_whats && errors.comp_whats}
												required
											/>
										</Box>
									</Box>

									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'space-around',
											flexDirection: { xs: 'column', md: 'row' },
										}}
									>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_nome_social"
												label="Nome Social / Artístico"
												placeholder="Entre com seu nome social ou artístico"
												variant="outlined"
												value={values.comp_nome_social}
												onChange={handleChange}
												onChangeCapture={this.props.handleChange(
													'comp_nome_social'
												)}
												onBlur={handleBlur}
												error={
													errors.comp_nome_social && touched.comp_nome_social
												}
												helperText={
													touched.comp_nome_social && errors.comp_nome_social
												}
											/>
										</Box>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_cpf"
												label="CPF"
												placeholder="Entre com o número do seu CPF, somente números."
												variant="outlined"
												value={values.comp_cpf}
												onChange={(e) => {
													this.handleChangeCpfMask(e, handleChange);
												}}
												onChangeCapture={this.props.handleChange('comp_cpf')}
												onBlur={handleBlur}
												error={errors.comp_cpf && touched.comp_cpf}
												helperText={touched.comp_cpf && errors.comp_cpf}
												required
											/>
										</Box>
									</Box>

									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'space-around',
											flexDirection: { xs: 'column', md: 'row' },
										}}
									>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_nasc"
												label="Data de Nascimento"
												InputLabelProps={{ shrink: true }}
												type="date"
												variant="outlined"
												value={values.comp_nasc}
												onChange={handleChange}
												onChangeCapture={this.props.handleChange('comp_nasc')}
												onBlur={handleBlur}
												error={errors.comp_nasc && touched.comp_nasc}
												helperText={touched.comp_nasc && errors.comp_nasc}
												required
											/>
										</Box>
										<Box
											sx={{
												width: { xs: '100%', md: '45%' },
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
										>
											<TextField
												sx={{ marginBottom: '2.625rem', width: '100%' }}
												id="comp_email"
												label="E-mail"
												placeholder="Entre com o seu e-mail."
												variant="outlined"
												value={values.comp_email}
												onChange={handleChange}
												onChangeCapture={this.props.handleChange('comp_email')}
												onBlur={handleBlur}
												error={errors.comp_email && touched.comp_email}
												helperText={touched.comp_email && errors.comp_email}
												required
											/>
										</Box>
									</Box>

									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'space-around',
											flexDirection: { xs: 'column', md: 'row' },
										}}
									>
										<Autocomplete
											id="cad-select-estado"
											getOptionLabel={(listaEstados) =>
												`${listaEstados.comp_estado_nome}`
											}
											options={listaEstados}
											sx={selectBoxStyle}
											isOptionEqualToValue={(option, value) =>
												option.comp_estado_nome === value.comp_estado_nome
											}
											noOptionsText={'Nenhum estado está disponível.'}
											renderOption={(props, listaEstados) => (
												<Box
													component="li"
													{...props}
													key={listaEstados.comp_estado}
												>
													{listaEstados.comp_estado_nome}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Estado"
													error={
														touched.comp_estado_nome &&
														Boolean(errors.comp_estado_nome)
													}
													helperText={
														touched.comp_estado_nome && errors.comp_estado_nome
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
												comp_estado: comp_estado,
												comp_estado_nome: comp_estado_nome,
											}}
											disableClearable
										/>

										<Autocomplete
											id="cad-select-cidade"
											getOptionLabel={(listaCidades) =>
												`${listaCidades.comp_cidade_nome}`
											}
											options={listaCidades}
											sx={selectBoxStyle}
											isOptionEqualToValue={(option, value) =>
												option.comp_cidade_nome === value.comp_cidade_nome
											}
											noOptionsText={'Nenhuma cidade está disponível.'}
											renderOption={(props, listaCidades) => (
												<Box
													component="li"
													{...props}
													key={listaCidades.comp_cidade}
												>
													{listaCidades.comp_cidade_nome}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Cidade"
													error={
														touched.comp_cidade_nome &&
														Boolean(errors.comp_cidade_nome)
													}
													helperText={
														touched.comp_cidade_nome && errors.comp_cidade_nome
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
												comp_cidade: comp_cidade,
												comp_cidade_nome: comp_cidade_nome,
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
											onClick={this.back}
										>
											Voltar
										</Button>
										<Button
											sx={{ margin: '.625rem', width: '7.5rem' }}
											type="submit"
											variant="contained"
											disabled={!isValid}
										>
											Continuar
										</Button>
									</Box>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</React.Fragment>
		);
	}
}

export default InformacaoPessoal;
