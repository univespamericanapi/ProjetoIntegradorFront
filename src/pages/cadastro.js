import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CadastroForm from '../components/Formularios/Cadastro';

class CadastroPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
			activeStep: 0,
			steps: [
				'Evento & Concurso',
				'Regras',
				'Informação Pessoal',
				'Apresentação',
				'Resumo',
			],
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, newValue) {
		this.setState({ value: newValue });
	}

	TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
				style={{ width: '100%', padding: '30px' }}
			>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		);
	}

	render() {
		const { value } = this.state;

		this.TabPanel.propTypes = {
			children: PropTypes.node,
			index: PropTypes.number.isRequired,
			value: PropTypes.number.isRequired,
		};

		const TabPanel = this.TabPanel;

		function a11yProps(index) {
			return {
				id: `vertical-tab-${index}`,
				'aria-controls': `vertical-tabpanel-${index}`,
			};
		}

		return (
			<Box
				sx={{
					width: '100%',
					flexGrow: 1,
					display: 'flex',
				}}
			>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={this.handleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: 'divider', width: '200px' }}
				>
					<Tab label="Cadastro" {...a11yProps(0)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<CadastroForm />
				</TabPanel>
			</Box>
		);
	}
}

export default CadastroPage;