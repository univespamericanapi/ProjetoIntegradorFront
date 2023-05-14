import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

export class CarouselEventos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {
				autoPlay: true,
				animation: 'fade',
				indicators: true,
				duration: 500,
				navButtonsAlwaysVisible: false,
				navButtonsAlwaysInvisible: false,
				cycleNavigation: true,
				fullHeightHover: true,
				swipe: true,
			},
		};
	}
	render() {
		return (
			<Carousel {...this.state.settings}>
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
		);
	}
}

class Banner extends Component {
	render() {
		const contentPosition = this.props.contentPosition
			? this.props.contentPosition
			: 'left';
		const totalItems = this.props.length ? this.props.length : 3;
		const mediaLength = totalItems - 1;

		let items = [];

		const content = (
			<Grid item xs={4} key="content">
				<CardContent
					sx={{
						color: 'white',
						backgroundColor: '#562F7E',
						height: '100%',
						position: 'relative',
						cursor: 'pointer',
						padding: '1.875rem',
						transition: '300ms',
						':hover': { backgroundColor: '#3F1F52' },
						':active': { backgroundColor: '#3F1F52' },
					}}
				>
					<Typography
						sx={{
							fontSize: '1.875rem',
							fontWeight: '500',
							color: 'white',
						}}
					>
						{this.props.item.Name}
					</Typography>

					<Typography
						sx={{
							marginTop: '0.625rem',
							fontSize: '1.125rem',
							color: 'white',
						}}
					>
						{this.props.item.Caption}
					</Typography>

					<Button
						variant="outlined"
						sx={{
							marginTop: '2.5rem',
							color: 'white',
							fontSize: '1.5rem',
							border: '3px solid white',
							textTransform: 'uppercase',
							transition: '200ms',
							':hover': {
								border: '3px solid #673ab7',
								filter: 'drop-shadow(1px 1px 2px #673ab7)',
							},
						}}
						href={this.props.item.link}
					>
						{this.props.item.linkName}
					</Button>
				</CardContent>
			</Grid>
		);

		for (let i = 0; i < mediaLength; i++) {
			const item = this.props.item.Items[i];

			const media = (
				<Grid item xs={4} key={item.Name}>
					<CardMedia
						component="img"
						alt="Logo Avalon"
						sx={{
							backgroundColor: 'white',
							height: '100%',
							overflow: 'hidden',
							position: 'relative',
							transition: '300ms',
							cursor: 'pointer',
							':hover': { filter: 'brightness(115%)' },
						}}
						image={item.Image}
						title={item.Name}
					/>
					<Typography
						sx={{
							textOverflow: 'ellipsis',
							position: 'absolute',
							bottom: 0,
							padding: '1rem',
							backgroundColor: 'black',
							color: 'white',
							opacity: 0.6,
							width: '100%',
							height: '10%',
							fontSize: '1.375rem',
							fontWeight: 200,
							transition: '300ms',
							cursor: 'pointer',
							':hover': { opacity: 0.8 },
						}}
					>
						{item.Name}
					</Typography>
				</Grid>
			);

			items.push(media);
		}

		if (contentPosition === 'left') {
			items.unshift(content);
		} else if (contentPosition === 'right') {
			items.push(content);
		} else if (contentPosition === 'middle') {
			items.splice(items.length / 2, 0, content);
		}

		return (
			<Card raised sx={{ height: '25rem', position: 'relative' }}>
				<Grid
					container
					spacing={0}
					sx={{ height: '100%', position: 'relative' }}
				>
					{items}
				</Grid>
			</Card>
		);
	}
}

const items = [
	{
		Name: 'Concursos',
		Caption: 'FAÇA SUA INSCRIÇÃO E GARANTA SUA VAGA!',
		contentPosition: 'left',
		link: '/cadastro',
		linkName: 'Cadastre-se',
		Items: [
			{
				Name: 'Desfile Cosplay',
				Image: '/assets/img/banner001.png',
			},
			{
				Name: 'Circuito Kpop',
				Image: '/assets/img/banner002.png',
			},
		],
	},
	{
		Name: 'Pira Anime Fest',
		Caption: '07 DE MAIO NO DOM BOSCO CIDADE ALTA',
		contentPosition: 'middle',
		link: 'https://animefest.com.br/piracicaba/',
		linkName: 'Venha conhecer mais!',
		Items: [
			{
				Name: 'PAF',
				Image: '/assets/img/banner003.png',
			},
			{
				Name: 'DESFILE COSPLAY',
				Image: '/assets/img/banner004.png',
			},
		],
	},
	{
		Name: 'Campinas Anime Fest',
		Caption: '20 DE AGOSTO NO LICEU SALESIANO',
		contentPosition: 'right',
		link: 'https://animefest.com.br/campinas/',
		linkName: 'Venha conhecer mais!',
		Items: [
			{
				Name: 'CAF',
				Image: '/assets/img/banner005.png',
			},
			{
				Name: 'FEIRA GEEK PARK',
				Image: '/assets/img/banner006.png',
			},
		],
	},
];

export default CarouselEventos;
