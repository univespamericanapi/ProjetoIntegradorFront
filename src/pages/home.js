import React, { Component } from 'react';
import CarouselEventos from '../components/CarouselEventos';

class Home extends Component {
	render() {
		return (
			<div style={{ marginTop: '50px', color: '#494949' }}>
				<CarouselEventos />
				<br />
			</div>
		);
	}
}

export default Home;
