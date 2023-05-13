import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { CarouselSettings } from '../config/carousel';
import { Typography } from '@mui/material';
import Banner from '../components/Banner';
import { bannerItems } from '../config/banner';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: CarouselSettings,
		};
	}
	render() {
		const items = bannerItems;
		return (
			<div style={{ marginTop: '50px', color: '#494949' }}>
				{console.log(process.env.PORT)}
				<Typography variant="h4" sx={{ textAlign: 'center' }}>
					Avalon Eventos
				</Typography>
				<br />
				<Carousel className="Example" {...this.state.settings}>
					{items.map((item, index) => {
						return (
							<Banner
								item={item}
								key={Number(index)}
								contentPosition={item.contentPosition}
							/>
						);
					})}
				</Carousel>
				<br />
			</div>
		);
	}
}

export default Home;
