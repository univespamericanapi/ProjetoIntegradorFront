import { Box, CardMedia, Typography } from '@mui/material';
import React, { Component } from 'react';
import logo from '../assets/img/logo_AVALON_EVENTOS_base-branco.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export class Footer extends Component {
	render() {
		return (
			<div
				className="footer"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					padding: '3.75rem 1rem',
					color: '#fff',
					backgroundColor: '#572d7f',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						width: '26.875rem',
						padding: '1rem',
					}}
				>
					<Typography>Realização</Typography>
					<CardMedia
						component="img"
						image={logo}
						alt="Logotipo da empresa, onde lê-se Avalon Eventos"
						sx={{
							width: '12.5rem',
						}}
					/>
					<Typography>
						O Anime Fest é um circuito de eventos de quadrinhos, games e cultura
						pop. Fale conosco:{' '}
						<a href="mailto:contato@avaloneventos.com.br">
							contato@avaloneventos.com.br
						</a>
					</Typography>
					<Box
						sx={{
							display: 'flex',
						}}
					>
						<a href="https://www.instagram.com/animefest/">
							<Box
								sx={{
									display: 'flex',
									padding: '.5rem',
									borderRadius: '50%',
									backgroundColor: 'transparent',
									margin: '1rem .5rem',
									':hover': { backgroundColor: '#fff' },
								}}
							>
								<InstagramIcon sx={{ color: '#fff', fontSize: '2.25rem', ':hover': { color: '#572d7f' }, }} name='Ícone do Instagram' />
							</Box>
						</a>
						<a href="https://www.facebook.com/CircuitoAnimeFest/">
							<Box
								sx={{
									display: 'flex',
									padding: '.5rem',
									borderRadius: '50%',
									backgroundColor: 'transparent',
									margin: '1rem .5rem',
									':hover': { backgroundColor: '#fff' },
								}}
							>
								<FacebookIcon sx={{ color: '#fff', fontSize: '2.25rem', ':hover': { color: '#572d7f' }, }} name='Ícone do Facebook' />
							</Box>
						</a>
					</Box>
					<Typography sx={{ fontSize: '0.75rem' }}>
						Copyright &copy; 2023 Avalon Eventos. Todos os direitos reservados.{' '}
						<br />
						Avalon Eventos LTDA. CPNJ: 99.999.999/9999-99
					</Typography>
				</Box>
			</div>
		);
	}
}

export default Footer;
