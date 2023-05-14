import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth';
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import { FlexBoxColumn } from '../styles/MuiTheme';

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: null,
			userReady: false,
			currentUser: { usuario_login: '' },
		};
	}

	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) this.setState({ redirect: '/home' });
		this.setState({ currentUser: currentUser, userReady: true });
	}

	render() {
		if (this.state.redirect) {
			return <Navigate to={this.state.redirect} />;
		}

		const { currentUser } = this.state;

		return (
			<Box sx={FlexBoxColumn}>
				{this.state.userReady ? (
					<Card sx={{ maxWidth: 750, margin: '60px' }}>
						<CardActionArea sx={{ padding: '20px' }}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Perfil de <strong>{currentUser.usuario_nome}</strong>
								</Typography>
								<List dense>
									<ListItem>
										<ListItemText
											primary="Token de Acesso:"
											secondary={
												currentUser.accessToken.substring(0, 20) +
												' ... ' +
												currentUser.accessToken.substr(
													currentUser.accessToken.length - 20
												)
											}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Id:"
											secondary={currentUser.usuario_id}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Login:"
											secondary={currentUser.usuario_login}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Refresh Token:"
											secondary={currentUser.refreshToken}
										/>
									</ListItem>
									<ListItem>
										<List dense>
											<ListItem>
												<ListItemText
													primary="Cargo Id:"
													secondary={currentUser.cargo.cargo_id}
												/>
											</ListItem>
											<ListItem>
												<ListItemText
													primary="Cargo Nome:"
													secondary={currentUser.cargo.cargo_nome}
												/>
											</ListItem>
										</List>
									</ListItem>
								</List>
							</CardContent>
						</CardActionArea>
					</Card>
				) : null}
			</Box>
		);
	}
}
