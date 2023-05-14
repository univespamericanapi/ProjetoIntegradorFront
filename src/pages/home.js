import React, { Component } from 'react';
import { Typography } from '@mui/material';
import CarouselEventos from '../components/CarouselEventos';

class Home extends Component {
	render() {
		return (
			<div style={{ marginTop: '50px', color: '#494949' }}>
				<Typography variant="h4" sx={{ textAlign: 'center' }}>
					Avalon Eventos
				</Typography>
				<br />
				<CarouselEventos />
				<br />
			</div>
		);
	}
}

export default Home;
