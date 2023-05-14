import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledTab, StyledTabs } from '../styles/StyledTabs';
import { deepOrange } from '@mui/material/colors';
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
					display: 'flex',
					height: 'calc(100dvh - 140px)',
				}}
			>
				<StyledTabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					textColor="primary"
					indicatorColor="primary"
					onChange={this.handleChange}
					aria-label="Vertical tabs example"
					sx={{
						borderRight: 1,
						borderColor: 'divider',
						width: '300px',
						bgcolor: deepOrange[500],
						height: '100%',
					}}
				>
					<StyledTab label="Item One" {...a11yProps(0)} />
					<StyledTab label="Item Two" {...a11yProps(1)} />
					<StyledTab label="Item Three" {...a11yProps(2)} />
				</StyledTabs>
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
