import React, { Component } from 'react';
import CarouselEventos from '../components/CarouselEventos';

class Home extends Component {
	render() {
		return (
			<div style={{ margin: '4.375rem 3.125rem', color: '#494949' }}>
				<CarouselEventos />
				<br />
			</div>
		);
	}
}

export default Home;
