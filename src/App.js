import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import AuthVerify from './common/authVerify';
import EventBus from './common/eventBus';
import AuthService from './services/auth';

import {
	deepPurpleTheme,
	deepOrangeTheme,
	FlexBoxColumn,
} from './styles/MuiTheme';
import { ThemeProvider } from '@mui/material/styles';
import {
	AppBar,
	Avatar,
	Box,
	Button,
	CardMedia,
	Container,
	CssBaseline,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import BoardAdmin from './pages/admin';
import BoardStaff from './pages/staff';
import CadastroPage from './pages/cadastro';

import logoLinha from './assets/img/logo-circuito-roxo-02.png';
import Footer from './components/Footer';

export class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
		this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
		this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
		this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);

		this.state = {
			anchorElNav: null,
			anchorElUser: null,
			showStaffBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		};
	}

	handleOpenNavMenu(event) {
		this.setState({ anchorElNav: event.currentTarget });
	}

	handleOpenUserMenu(event) {
		this.setState({ anchorElUser: event.currentTarget });
	}

	handleCloseNavMenu() {
		this.setState({ anchorElNav: null });
	}

	handleCloseUserMenu() {
		this.setState({ anchorElUser: null });
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showStaffBoard:
					user.cargo.cargo_nome === 'staff' ||
					user.cargo.cargo_nome === 'admin',
				showAdminBoard: user.cargo.cargo_nome === 'admin',
			});
		}

		EventBus.on('logout', () => {
			this.logOut();
		});
	}

	componentWillUnmount() {
		EventBus.remove('logout');
	}

	logOut() {
		AuthService.logout();
		this.setState({
			showStaffBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		});
	}

	render() {
		const { anchorElNav, anchorElUser } = this.state;
		const { currentUser, showStaffBoard, showAdminBoard } = this.state;
		const AppFlexBoxColumn = FlexBoxColumn;
		AppFlexBoxColumn.minHeight = '100dvh';
		AppFlexBoxColumn.justifyContent = 'start';
		AppFlexBoxColumn.padding = 0;

		return (
			<Box sx={AppFlexBoxColumn}>
				<CssBaseline>
					<ThemeProvider theme={deepPurpleTheme}>
						<AppBar position="static">
							<Container maxWidth="xl">
								<Toolbar disableGutters>
									<Link to={'/'}>
										<CardMedia
											component="img"
											image={logoLinha}
											alt="Logo Avalon"
											sx={{
												display: { xs: 'none', md: 'flex' },
												flexGrow: 1,
												width: '12.5rem',
												marginRight: '1rem',
												':hover': {
													filter: 'drop-shadow(1px 1px 2px #FFFFFF)',
												},
											}}
										/>
									</Link>
									<Box
										sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
									>
										<IconButton
											size="large"
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={this.handleOpenNavMenu}
											color="inherit"
										>
											<MenuIcon />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorElNav}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'left',
											}}
											open={Boolean(anchorElNav)}
											onClose={this.handleCloseNavMenu}
											sx={{
												display: { xs: 'block', md: 'none' },
											}}
										>
											{/* Páginas tela pequena */}
											<MenuItem
												key={'cadastro'}
												onClick={this.handleCloseNavMenu}
												component={Link}
												to="/cadastro"
											>
												<Typography textAlign="center">
													{'Cadastro'}
												</Typography>
											</MenuItem>
											{showStaffBoard && (
												<MenuItem
													key={'staff-board'}
													onClick={this.handleCloseNavMenu}
													component={Link}
													to="/staff"
												>
													<Typography textAlign="center">
														{'Staff Board'}
													</Typography>
												</MenuItem>
											)}
											{showAdminBoard && (
												<MenuItem
													key={'admin-board'}
													onClick={this.handleCloseNavMenu}
													component={Link}
													to="/admin"
												>
													<Typography textAlign="center">
														{'Admin Board'}
													</Typography>
												</MenuItem>
											)}
										</Menu>
									</Box>
									<Typography
										variant="h5"
										noWrap
										sx={{
											mr: 2,
											display: { xs: 'flex', md: 'none' },
											flexGrow: 1,
											fontFamily: 'monospace',
											fontWeight: 700,
											color: 'inherit',
											textDecoration: 'none',
										}}
										component={Link}
										to="/"
									>
										Avalon Eventos
									</Typography>
									<Box
										sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
									>
										{/* Páginas tela grande */}
										<Button
											key={'cadastro'}
											onClick={this.handleCloseNavMenu}
											sx={{ my: 2, color: 'white', display: 'block' }}
											component={Link}
											to="/cadastro"
										>
											{'cadastro'}
										</Button>

										{showStaffBoard && (
											<Button
												key={'staff-board'}
												onClick={this.handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}
												component={Link}
												to="/staff"
											>
												{'Staff Board'}
											</Button>
										)}

										{showAdminBoard && (
											<Button
												key={'admin-board'}
												onClick={this.handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}
												component={Link}
												to="/admin"
											>
												{'Admin Board'}
											</Button>
										)}
									</Box>
									<Box sx={{ flexGrow: 0 }}>
										{currentUser ? (
											<Tooltip title="Open settings">
												<IconButton
													onClick={this.handleOpenUserMenu}
													sx={{ p: 0 }}
												>
													<Avatar
														alt={currentUser.usuario_nome}
														src="/static/images/avatar/2.jpg"
													/>
												</IconButton>
											</Tooltip>
										) : (
											<Button
												key={'login'}
												onClick={this.handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}
												component={Link}
												to="/login"
											>
												{'Login'}
											</Button>
										)}
										<Menu
											sx={{ mt: '2.875rem' }}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorElUser)}
											onClose={this.handleCloseUserMenu}
											onClick={this.handleCloseUserMenu}
										>
											<MenuItem key={'perfil'} component={Link} to="/profile">
												<Typography textAlign="center">{'Perfil'}</Typography>
											</MenuItem>
											<MenuItem
												key={'logout'}
												onClick={this.logOut}
												component={Link}
												to="/"
											>
												<Typography textAlign="center">{'Logout'}</Typography>
											</MenuItem>
										</Menu>
									</Box>
								</Toolbar>
							</Container>
						</AppBar>
					</ThemeProvider>
					<ThemeProvider theme={deepOrangeTheme}>
						<Box sx={{ width: '100%', minHeight: 'calc(100dvh - 8.75rem)' }}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/cadastro" element={<CadastroPage />} />
								<Route path="/login" element={<Login />} />
								<Route path="/profile" element={<Profile />} />
								{/* <Route path="/user" element={<BoardUser />} /> */}
								<Route path="/staff" element={<BoardStaff />} />
								<Route
									path="/admin"
									element={<BoardAdmin logOut={this.logOut} />}
								/>
							</Routes>
						</Box>
						<Box sx={{ width: '100%' }}>
							<Footer />
						</Box>
						<AuthVerify logOut={this.logOut} />
					</ThemeProvider>
				</CssBaseline>
			</Box>
		);
	}
}

export default App;
