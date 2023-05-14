import React, { Component } from 'react';
import CarouselEventos from '../components/CarouselEventos';

class Home extends Component {
	render() {
		return (
			<div style={{ margin: '70px 50px', color: '#494949' }}>
				<CarouselEventos />
				<br />
			</div>
		);
	}
}

export default Home;
