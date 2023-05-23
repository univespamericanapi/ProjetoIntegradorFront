import React, { Component } from 'react';
import CarouselEventos from '../components/CarouselEventos';

class Home extends Component {
	render() {
		return (
			<div
				style={{
					padding: '4.375rem 3.125rem 1rem 3.125rem',
					color: '#494949',
					minHeight: 'calc(100dvh - 4.25rem)',
				}}
			>
				<CarouselEventos />
				<br />
			</div>
		);
	}
}

export default Home;
