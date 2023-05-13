import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

class BoardStaff extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
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
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
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
					bgcolor: 'background.paper',
					display: 'flex',
					height: 224,
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
					<Tab label="Item One" {...a11yProps(0)} />
					<Tab label="Item Two" {...a11yProps(1)} />
					<Tab label="Item Three" {...a11yProps(2)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					Item One
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
			</Box>
		);
	}
}

export default BoardStaff;
