import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import React, { Component } from 'react';
import InformacaoPessoal from './InformacaoPessoal';
import Regras from './Regras';
import Confirm from './Confirm';
import Success from './Success';
import EventoConcurso from './EventoConcurso';
import Apresentacao from './Apresentacao';

export class CadastroForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			steps: [
				'Evento & Concurso',
				'Regras',
				'Informação Pessoal',
				'Apresentação',
				'Resumo',
			],
			values: {
				comp_email: '',
				comp_nome: '',
				comp_nome_social: '',
				comp_cpf: '',
				comp_nasc: '',
				comp_whats: '',
				comp_cidade: 0,
				comp_cidade_nome: '',
				comp_estado: 0,
				comp_estado_nome: '',
				apres_nome: '',
				apres_origem: '',
				apres_link_ref: '',
				part_event: 0,
				part_event_nome: '',
				part_conc: 0,
				part_conc_nome: '',
				part_aceit_regul: false,
				extra_categ: 0,
				extra_categ_nome: '',
			},
			initialValues: {},
			successMsg: '',
		};
		this.state.initialValues = this.state.values;

		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.resetAll = this.resetAll.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeAutocomplete = this.handleChangeAutocomplete.bind(this);
		this.switchStep = this.switchStep.bind(this);
	}

	//Próximo passo
	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};

	//Passo anterior
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
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

	successMsgSave = (value) => {
		this.setState({
			successMsg: {
				value,
			},
		});
	};

	// Resetar tudo
	resetAll = () => {
		this.setState({
			values: this.state.initialValues,
		});

		this.setState({ step: 0 });
	};

	//Switch steps
	switchStep = (step) => {
		const values = this.state.values;

		switch (step) {
			case 0:
				return (
					<EventoConcurso
						nextStep={this.nextStep}
						handleChangeAutocomplete={this.handleChangeAutocomplete}
						values={values}
					/>
				);
			case 1:
				return (
					<Regras
						nextStep={this.nextStep}
						resetAll={this.resetAll}
						handleChangeAutocomplete={this.handleChangeAutocomplete}
						values={values}
					/>
				);
			case 2:
				return (
					<InformacaoPessoal
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleChangeAutocomplete={this.handleChangeAutocomplete}
						values={values}
					/>
				);
			case 3:
				return (
					<Apresentacao
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleChangeAutocomplete={this.handleChangeAutocomplete}
						values={values}
					/>
				);
			case 4:
				return (
					<Confirm
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						successMsgSave={this.successMsgSave}
						values={values}
					/>
				);
			case 5:
				return (
					<Success
						resetAll={this.resetAll}
						prevStep={this.prevStep}
						successMsg={this.state.successMsg}
					/>
				);
			default:
				return (
					<Box>
						<h3>Passo não encontrado, algum erro ocorreu.</h3>
					</Box>
				);
		}
	};

	render() {
		const { step, steps } = this.state;

		return (
			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={step} alternativeLabel>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>
									<Box
										sx={{
											display: { xs: 'none', md: 'flex' },
											justifyContent: 'center',
										}}
									>
										{label}
									</Box>
								</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{step === steps ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button onClick={this.resetAll}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{this.switchStep(step)}
						</Box>
					</React.Fragment>
				)}
			</Box>
		);
	}
}

export default CadastroForm;
