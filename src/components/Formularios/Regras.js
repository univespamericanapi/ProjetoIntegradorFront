import React, { Component } from 'react';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ErroRegras from './regras/ErroRegras';
import CosplayDesfileRegras from './regras/CosplayDesfileRegras';

export class Regras extends Component {
	constructor(props) {
		super(props);
		this.CosplayDesfile = 'Cosplay Desfile';
		this.CosplayCircuito = 'CosplayCircuito';
	}

	continue = (e) => {
		this.props.nextStep();
	};

	reset = (e) => {
		e.preventDefault();
		this.props.resetAll();
	};

	handleCheckChange = (event, value) => {
		const { handleChangeAutocomplete } = this.props;
		handleChangeAutocomplete({ part_aceit_regul: value });
	};

	switchRegras = (concurso) => {
		switch (concurso) {
			case this.CosplayDesfile:
				return <CosplayDesfileRegras />;
			case this.CosplayCircuito:
				return <h1>Ainda sem regras... Aguarde...</h1>;
			default:
				return <ErroRegras />;
		}
	};

	render() {
		const { part_aceit_regul, part_conc_nome } = this.props.values;

		return (
			<React.Fragment>
				<Formik
					initialValues={{ part_aceit_regul }}
					validationSchema={Yup.object().shape({})}
					onSubmit={(values) => {
						this.continue();
					}}
				>
					{(props) => {
						const { isValid, handleBlur } = props;

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
											width: '90%',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<Box>{this.switchRegras(part_conc_nome)}</Box>

										<Box>
											<FormControlLabel
												name="part_aceit_regul"
												id="part_aceit_regul"
												required
												control={<Checkbox />}
												label="Li e aceito as regras e termos descritos acima."
												onChange={this.handleCheckChange}
												onBlur={handleBlur}
												checked={part_aceit_regul}
												sx={{ margin: '8px' }}
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
										<Button
											sx={{ margin: '10px', width: '120px' }}
											variant="contained"
											onClick={this.reset}
										>
											Cancelar
										</Button>
										<Button
											sx={{ margin: '10px', width: '120px' }}
											type="submit"
											variant="contained"
											disabled={!isValid}
										>
											Concordar
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

export default Regras;
