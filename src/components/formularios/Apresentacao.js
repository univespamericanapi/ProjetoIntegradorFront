import React, { Component } from 'react';
import {
	TextField,
	Button,
	Box,
	Autocomplete,
	Tooltip,
	CircularProgress,
	Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { deepOrange } from '@mui/material/colors';
import extrairNomeDoSite from '../../utils/extrairNomeDoSite';

const urlRegExp = /(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-z]+(\/[^\s]*)?/i;

export class Apresentacao extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listaCategorias: [],
			listaEstilos: [],
			listaModalidades: [],
			selectBoxStyle: {
				width: '90%',
			},
			loading: true,
		};

		this.CosplayCircuito = 'Cosplay Circuito';
		this.CosplayDesfile = 'Cosplay Desfile';
		this.Karaoke = 'Karaoke';
		this.KpopCircuito = 'Kpop Circuito';
		this.KpopSolo = 'Kpop Solo / Duo';

		this.fetchCategorias = this.fetchCategorias.bind(this);
		this.categoriaSelecionada = this.categoriaSelecionada.bind(this);
		this.fetchCategorias();

		this.fetchEstilos = this.fetchEstilos.bind(this);
		this.estiloSelecionado = this.estiloSelecionado.bind(this);
		this.fetchEstilos();

		this.fetchModalidades = this.fetchModalidades.bind(this);
		this.modalidadeSelecionado = this.modalidadeSelecionado.bind(this);
		this.fetchModalidades();
	}

	continue = (e) => {
		this.props.values.extra_link_av_short = extrairNomeDoSite(this.props.values.extra_link_av);
		this.props.values.apres_link_ref_short = extrairNomeDoSite(this.props.values.apres_link_ref);
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	async fetchCategorias() {
		this.setState({ loading: true });
		try {
			const response = await api.get('/lista/categoria');
			const categorias = response.data.map((categoria) => ({
				extra_categ: categoria.categ_id,
				extra_categ_nome: categoria.categ_nome,
			}));
			categorias.push({ extra_categ: 0, extra_categ_nome: '' });
			this.setState({ listaCategorias: categorias });
		} catch (error) {
			console.error(error);
		}
		this.setState({ loading: false });
	}

	categoriaSelecionada = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
		} catch (error) {
			console.error(error);
		}
	};

	async fetchEstilos() {
		this.setState({ loading: true });
		try {
			const response = await api.get('/lista/estilo');
			const estilos = response.data.map((estilo) => ({
				extra_estil: estilo.estil_id,
				extra_estil_nome: estilo.estil_nome,
			}));
			estilos.push({ extra_estil: 0, extra_estil_nome: '' });
			this.setState({ listaEstilos: estilos });
		} catch (error) {
			console.error(error);
		}
		this.setState({ loading: false });
	}

	estiloSelecionado = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
		} catch (error) {
			console.error(error);
		}
	};

	async fetchModalidades() {
		this.setState({ loading: true });
		try {
			const response = await api.get('/lista/modalidade');
			const modalidades = response.data.map((modalidade) => ({
				extra_mod: modalidade.mod_id,
				extra_mod_nome: modalidade.mod_nome,
			}));
			modalidades.push({ extra_mod: 0, extra_mod_nome: '' });
			this.setState({ listaModalidades: modalidades });
		} catch (error) {
			console.error(error);
		}
		this.setState({ loading: false });
	}

	modalidadeSelecionado = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
		} catch (error) {
			console.error(error);
		}
	};

	switchExtra = (concurso, props) => {
		const { listaCategorias, listaEstilos, listaModalidades, selectBoxStyle } = this.state;
		const {
			extra_categ,
			extra_categ_nome,
			extra_integ,
			extra_estil,
			extra_estil_nome,
			extra_link_av,
			extra_mat,
			extra_mod,
			extra_mod_nome,
		} = this.props.values;

		switch (concurso) {
			case this.CosplayDesfile:
				return (
					<Box
						sx={{
							width: { xs: '100%', md: '45%' },
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: '2.625rem',
						}}
					>
						<Autocomplete
							id="cad-select-categoria"
							getOptionLabel={(listaCategorias) =>
								`${listaCategorias.extra_categ_nome}`
							}
							options={listaCategorias}
							sx={selectBoxStyle}
							isOptionEqualToValue={(option, value) =>
								option.extra_categ_nome === value.extra_categ_nome
							}
							noOptionsText={'Nenhuma categoria está disponível.'}
							renderOption={(props, listaCategorias) => (
								<Box
									component="li"
									{...props}
									key={listaCategorias.extra_categ}
								>
									{listaCategorias.extra_categ_nome}
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Categoria"
									error={
										props.touched.extra_categ_nome &&
										Boolean(props.errors.extra_categ_nome)
									}
									helperText={
										props.touched.extra_categ_nome &&
										props.errors.extra_categ_nome
									}
									required
									variant="outlined"
								/>
							)}
							onChange={(event, values, select, option) => {
								this.categoriaSelecionada(event, values, select, option);
								props.handleChange(event, values, select, option);
							}}
							onBlur={props.handleBlur}
							value={{
								extra_categ: extra_categ,
								extra_categ_nome: extra_categ_nome,
							}}
							disableClearable
						/>
						<Tooltip title="Selecione a categoria a qual irá competir.">
							<HelpIcon
								sx={{
									display: 'flex',
									fontSize: '1.5rem',
									color: deepOrange[500],
									margin: '.625rem',
								}}
							/>
						</Tooltip>
					</Box>
				);
			case this.CosplayCircuito:
				return (
					<Box sx={{
						width: '100%',
					}}>
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
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<Autocomplete
									id="cad-select-estilo"
									getOptionLabel={(listaEstilos) =>
										`${listaEstilos.extra_estil_nome}`
									}
									options={listaEstilos}
									sx={selectBoxStyle}
									isOptionEqualToValue={(option, value) =>
										option.extra_estil_nome === value.extra_estil_nome
									}
									noOptionsText={'Nenhum estilo está disponível.'}
									renderOption={(props, listaEstilos) => (
										<Box
											component="li"
											{...props}
											key={listaEstilos.extra_estil}
										>
											{listaEstilos.extra_estil_nome}
										</Box>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Estilo"
											error={
												props.touched.extra_estil_nome &&
												Boolean(props.errors.extra_estil_nome)
											}
											helperText={
												props.touched.extra_estil_nome &&
												props.errors.extra_estil_nome
											}
											required
											variant="outlined"
										/>
									)}
									onChange={(event, values, select, option) => {
										this.categoriaSelecionada(event, values, select, option);
										props.handleChange(event, values, select, option);
									}}
									onBlur={props.handleBlur}
									value={{
										extra_estil: extra_estil,
										extra_estil_nome: extra_estil_nome,
									}}
									disableClearable
								/>
								<Tooltip title="Selecione o estilo ao qual irá competir.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
							<Box
								sx={{
									width: { xs: '100%', md: '45%' },
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_integ"
									label="Nome Integrantes"
									placeholder="Marcos, Aline"
									variant="outlined"
									value={extra_integ}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange('extra_integ')}
									onBlur={props.handleBlur}
									error={props.errors.extra_integ && props.touched.extra_integ}
									helperText={props.touched.extra_integ && props.errors.extra_integ}
								/>
								<Tooltip title="Digite os nomes dos integrantes, caso tenha, separados por vírgula.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
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
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_link_av"
									label="Link do Áudio / Vídeo"
									placeholder="https://www.youtube.com"
									variant="outlined"
									value={extra_link_av}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange(
										'extra_link_av'
									)}
									onBlur={props.handleBlur}
									error={props.errors.extra_link_av && props.touched.extra_link_av}
									helperText={props.touched.extra_link_av && props.errors.extra_link_av}
									required
								/>
								<Tooltip title="Digite um link para o vídeo ou áudio que será utilizado na apresentação.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
						</Box>
					</Box>
				);
			case this.Karaoke:
				return <Box></Box>;
			case this.KpopCircuito:
				return (
					<Box sx={{
						width: '100%',
					}}>
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
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_integ"
									label="Nome Integrantes"
									placeholder="Marcos, Aline"
									variant="outlined"
									value={extra_integ}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange('extra_integ')}
									onBlur={props.handleBlur}
									error={props.errors.extra_integ && props.touched.extra_integ}
									helperText={props.touched.extra_integ && props.errors.extra_integ}
								/>
								<Tooltip title="Digite os nomes dos integrantes, caso tenha, separados por vírgula.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
							<Box
								sx={{
									width: { xs: '100%', md: '45%' },
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_mat"
									label="Material"
									placeholder="Material"
									variant="outlined"
									value={extra_mat}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange('extra_mat')}
									onBlur={props.handleBlur}
									error={props.errors.extra_mat && props.touched.extra_mat}
									helperText={props.touched.extra_mat && props.errors.extra_mat}
								/>
								<Tooltip title="Material.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
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
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_link_av"
									label="Link do Áudio / Vídeo"
									placeholder="https://www.youtube.com"
									variant="outlined"
									value={extra_link_av}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange(
										'extra_link_av'
									)}
									onBlur={props.handleBlur}
									error={props.errors.extra_link_av && props.touched.extra_link_av}
									helperText={props.touched.extra_link_av && props.errors.extra_link_av}
									required
								/>
								<Tooltip title="Digite um link para o vídeo ou áudio que será utilizado na apresentação.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
						</Box>
					</Box>
				);
			case this.KpopSolo:
				return (
					<Box sx={{
						width: '100%',
					}}>
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
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<Autocomplete
									id="cad-select-modalidade"
									getOptionLabel={(listaModalidades) =>
										`${listaModalidades.extra_mod_nome}`
									}
									options={listaModalidades}
									sx={selectBoxStyle}
									isOptionEqualToValue={(option, value) =>
										option.extra_mod_nome === value.extra_mod_nome
									}
									noOptionsText={'Nenhuma modalidade está disponível.'}
									renderOption={(props, listaModalidades) => (
										<Box
											component="li"
											{...props}
											key={listaModalidades.extra_mod}
										>
											{listaModalidades.extra_mod_nome}
										</Box>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Modalidade"
											error={
												props.touched.extra_mod_nome &&
												Boolean(props.errors.extra_mod_nome)
											}
											helperText={
												props.touched.extra_mod_nome &&
												props.errors.extra_mod_nome
											}
											required
											variant="outlined"
										/>
									)}
									onChange={(event, values, select, option) => {
										this.categoriaSelecionada(event, values, select, option);
										props.handleChange(event, values, select, option);
									}}
									onBlur={props.handleBlur}
									value={{
										extra_mod: extra_mod,
										extra_mod_nome: extra_mod_nome,
									}}
									disableClearable
								/>
								<Tooltip title="Selecione a modalidade ao qual irá competir.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
							<Box
								sx={{
									width: { xs: '100%', md: '45%' },
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_integ"
									label="Nome Integrantes"
									placeholder="Marcos, Aline"
									variant="outlined"
									value={extra_integ}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange('extra_integ')}
									onBlur={props.handleBlur}
									error={props.errors.extra_integ && props.touched.extra_integ}
									helperText={props.touched.extra_integ && props.errors.extra_integ}
								/>
								<Tooltip title="Digite os nomes dos integrantes, caso tenha, separados por vírgula.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
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
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: '2.625rem',
								}}
							>
								<TextField
									sx={{ width: '90%' }}
									id="extra_link_av"
									label="Link do Áudio / Vídeo"
									placeholder="https://www.youtube.com"
									variant="outlined"
									value={extra_link_av}
									onChange={props.handleChange}
									onChangeCapture={this.props.handleChange(
										'extra_link_av'
									)}
									onBlur={props.handleBlur}
									error={props.errors.extra_link_av && props.touched.extra_link_av}
									helperText={props.touched.extra_link_av && props.errors.extra_link_av}
									required
								/>
								<Tooltip title="Digite um link para o vídeo ou áudio que será utilizado na apresentação.">
									<HelpIcon
										sx={{
											display: 'flex',
											fontSize: '1.5rem',
											color: deepOrange[500],
											margin: '.625rem',
										}}
									/>
								</Tooltip>
							</Box>
						</Box>
					</Box>
				);
			default:
				return;
		}
	};

	render() {
		const { apres_nome, apres_origem, apres_link_ref, part_conc_nome } =
			this.props.values;
		const { loading } = this.state;

		return (
			<Formik
				initialValues={{
					apres_nome,
					apres_origem,
					apres_link_ref,
					part_conc_nome,
				}}
				validationSchema={Yup.object().shape({
					apres_nome: Yup.string()
						.required('Campo requerido.')
						.min(3, 'Deve conter no mínimo 3 caracteres.'),
					apres_origem: Yup.string()
						.required('Campo requerido.')
						.min(3, 'Deve conter no mínimo 3 caracteres.'),
					apres_link_ref: Yup.string().matches(
						urlRegExp,
						'Deve ser um link válido.'
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
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '2.625rem',
										}}
									>
										<TextField
											sx={{ width: '90%' }}
											id="apres_nome"
											label="Nome do Personagem / Música"
											placeholder="Goku"
											variant="outlined"
											value={values.apres_nome}
											onChange={handleChange}
											onChangeCapture={this.props.handleChange('apres_nome')}
											onBlur={handleBlur}
											error={errors.apres_nome && touched.apres_nome}
											helperText={touched.apres_nome && errors.apres_nome}
											required
										/>
										<Tooltip title="Digite o nome do personagem ou música que irá apresentar.">
											<HelpIcon
												sx={{
													display: 'flex',
													fontSize: '1.5rem',
													color: deepOrange[500],
													margin: '.625rem',
												}}
											/>
										</Tooltip>
									</Box>
									<Box
										sx={{
											width: { xs: '100%', md: '45%' },
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '2.625rem',
										}}
									>
										<TextField
											sx={{ width: '90%' }}
											id="apres_origem"
											label="Origem do Personagem / Música"
											placeholder="Dragon Ball Z"
											variant="outlined"
											value={values.apres_origem}
											onChange={handleChange}
											onChangeCapture={this.props.handleChange(
												'apres_origem'
											)}
											onBlur={handleBlur}
											error={errors.apres_origem && touched.apres_origem}
											helperText={touched.apres_origem && errors.apres_origem}
											required
										/>
										<Tooltip title="Digite a origem do seu personage (Dragon Ball Z, Cavaleiros dos Zodiácos, etc) ou música (Blackpink, BTS, etc).">
											<HelpIcon
												sx={{
													display: 'flex',
													fontSize: '1.5rem',
													color: deepOrange[500],
													margin: '.625rem',
												}}
											/>
										</Tooltip>
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
											width: { xs: '100%', md: '95%' },
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											marginBottom: '2.625rem',
										}}
									>
										<TextField
											sx={{ width: '95%' }}
											id="apres_link_ref"
											label="Link de Referência"
											placeholder="https://drive.google.com/file/d/12Pq84KiIRZphXmrdeG-slTM5LpyAin13/view?usp=sharing"
											variant="outlined"
											value={values.apres_link_ref}
											onChange={handleChange}
											onChangeCapture={this.props.handleChange(
												'apres_link_ref'
											)}
											onBlur={handleBlur}
											error={errors.apres_link_ref && touched.apres_link_ref}
											helperText={
												touched.apres_link_ref && errors.apres_link_ref
											}
										/>
										<Tooltip title="Entre com o link contendo imagem / vídeo / música de referência do personagem ou música a ser apresentada.">
											<HelpIcon
												sx={{
													display: 'flex',
													fontSize: '1.5rem',
													color: deepOrange[500],
													margin: '.625rem',
												}}
											/>
										</Tooltip>
									</Box>
								</Box>

								{this.switchExtra(part_conc_nome, props)}

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
							{loading && (
								<Box
									sx={{
										width: '100%',
										height: '100%',
										position: 'absolute',
										top: '0',
										left: '0',
										backgroundColor: 'rgba(0, 0, 0, 0.9)',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<CircularProgress
										size={36}
										sx={{
											color: deepOrange[500],
											filter: 'drop-shadow(0 0 0.5rem #ffab91)',
											margin: '2rem',
										}}
									/>
									<Typography
										sx={{
											color: deepOrange[500],
											margin: '2rem',
										}}
										variant="h4"
										component="h4"
									>
										Carregando, aguarde...
									</Typography>
								</Box>
							)}
						</Form>
					);
				}}
			</Formik>
		);
	}
}

export default Apresentacao;
