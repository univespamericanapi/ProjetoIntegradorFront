import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledTab, StyledTabs } from '../styles/StyledTabs';
import { deepOrange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FlexBoxColumn } from '../styles/MuiTheme';
import UserService from '../services/user';
import EventBus from '../common/eventBus';
import { withRouter } from '../common/withRouter';
import { Card, CardActionArea, CardContent } from '@mui/material';
import Checkin from '../components/staff/checkin';

class StaffBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			logged: true,
			value: 0,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		UserService.getStaffBoard().then(
			(response) => {
				this.setState({
					content: response.data,
				});
				this.setLogged(true);
			},
			(error) => {
				this.setState({ content: error.response?.data?.message || error.message || error.toString(), });

				if (error.response && error.response.status === 401) {
					EventBus.dispatch('logout');
				}

				this.setLogged(false);

				this.props.logOut();

				this.props.router.navigate('/login');
				window.location.reload();
			}
		);
	}

	setLogged = (bol) => {
		this.setState({
			logged: bol,
		});
	};

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
		const { value, logged } = this.state;
		const AdminFlexBoxColumn = { ...FlexBoxColumn };
		AdminFlexBoxColumn.padding = '2.5rem';

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
			<Box>
				{logged ? (
					<Box
						sx={{
							width: '100%',
							flexGrow: 1,
							display: 'flex',
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
								width: '18.75rem',
								bgcolor: deepOrange[500],
								minHeight: 'calc(100dvh - 4.25rem)',
							}}
						>
							<StyledTab label="Início" {...a11yProps(0)} />
							<StyledTab label="Checkin" {...a11yProps(1)} />
						</StyledTabs>

						<TabPanel value={value} index={0} style={{ width: '100%' }}>
							<Box sx={AdminFlexBoxColumn}>
								<Card sx={{ width: 345 }}>
									<CardActionArea>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												Staff Board
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{this.state.content}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Box>
						</TabPanel>
						<TabPanel value={value} index={1} style={{ width: '100%' }}>
							<Checkin {...this.props} setLogged={this.setLogged} />
						</TabPanel>
					</Box>
				) : (
					<Box>
						{this.props.router.navigate('/login')}
						{window.location.reload()}
					</Box>
				)}
			</Box>
		);
	}
}

export default withRouter(StaffBoard);
