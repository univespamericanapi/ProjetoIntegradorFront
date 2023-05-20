import React, { Component } from 'react';
import { TextField, Button, Box, Autocomplete, Tooltip } from '@mui/material';
import api from '../../services/api';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

export class EventoConcurso extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listaEventos: [],
			listaConcursos: [],
			selectBoxStyle: { width: { xs: '90%', md: '45%' }, margin: '1.25rem' },
		};
		this.fetchEventos = this.fetchEventos.bind(this);
		this.fetchConcursos = this.fetchConcursos.bind(this);
		this.eventoSelecionado = this.eventoSelecionado.bind(this);
		this.concursoSelecionado = this.concursoSelecionado.bind(this);
		this.fetchEventos();
	}

	continue = (e) => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	async fetchEventos() {
		try {
			const response = await api.get('/lista/evento');
			const eventos = response.data.map((evento) => ({
				part_event: evento.event_id,
				part_event_nome: evento.event_ed_nome,
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
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
			await this.fetchConcursos(value.part_event);
		} catch (error) {
			console.log(error);
		}
	};

	concursoSelecionado = async (event, value) => {
		try {
			const { handleChangeAutocomplete } = this.props;
			await handleChangeAutocomplete(value);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { part_event, part_event_nome, part_conc, part_conc_nome } =
			this.props.values;
		const { listaEventos, listaConcursos, selectBoxStyle } = this.state;

		return (
			<React.Fragment>
				<Formik
					initialValues={{
						part_event,
						part_event_nome,
						part_conc,
						part_conc_nome,
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
									<Tooltip title="Selecione o evento que participará de algum concurso.">
										<Autocomplete
											id="cad-select-evento"
											getOptionLabel={(listaEventos) =>
												`${listaEventos.part_event_nome}`
											}
											options={listaEventos}
											sx={selectBoxStyle}
											isOptionEqualToValue={(option, value) =>
												option.part_event_nome === value.part_event_nome
											}
											noOptionsText={'Nenhum evento está disponível.'}
											renderOption={(props, listaEventos) => (
												<Box
													component="li"
													{...props}
													key={listaEventos.part_event}
												>
													{listaEventos.part_event_nome}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Evento"
													error={
														touched.part_event_nome &&
														Boolean(errors.part_event_nome)
													}
													helperText={
														touched.part_event_nome && errors.part_event_nome
													}
													required
													variant="outlined"
												/>
											)}
											onChange={(event, values, select, option) => {
												this.eventoSelecionado(event, values, select, option);
												handleChange(event, values, select, option);
											}}
											onBlur={handleBlur}
											value={{
												part_event: part_event,
												part_event_nome: part_event_nome,
											}}
											disableClearable
										/>
									</Tooltip>

									<Tooltip title="Selecione o concurso ao qual irá competir.">
										<Autocomplete
											id="cad-select-concurso"
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
												<Box
													component="li"
													{...props}
													key={listaConcursos.part_conc}
												>
													{listaConcursos.part_conc_nome}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Concurso"
													error={
														touched.part_conc_nome &&
														Boolean(errors.part_conc_nome)
													}
													helperText={
														touched.part_conc_nome && errors.part_conc_nome
													}
													required
													variant="outlined"
												/>
											)}
											onChange={(event, values, select, option) => {
												this.concursoSelecionado(event, values, select, option);
												handleChange(event, values, select, option);
											}}
											onBlur={handleBlur}
											value={{
												part_conc: part_conc,
												part_conc_nome: part_conc_nome,
											}}
											disableClearable
										/>
									</Tooltip>

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
											disabled
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

export default EventoConcurso;
