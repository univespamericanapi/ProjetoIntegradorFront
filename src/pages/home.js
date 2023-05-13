import React, { useState } from 'react';
import Settings, { DefaultSettingsT } from '../config/Settings';
import Carousel from 'react-material-ui-carousel';

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Button,
} from '@mui/material';

const Example = () => {
	const [settings, setSettings] = useState(DefaultSettingsT);

	return (
		<div style={{ marginTop: '50px', color: '#494949' }}>
			<Typography variant="h4">Example: eBay&trade; style</Typography>
			<br />
			<Carousel className="Example" {...settings}>
				{items.map((item, index) => {
					return (
						<Banner
							item={item}
							key={index}
							contentPosition={item.contentPosition}
						/>
					);
				})}
			</Carousel>
			<br />
			<Settings settings={settings} setSettings={setSettings} />
		</div>
	);
};

const Banner = (props) => {
	const contentPosition = props.contentPosition
		? props.contentPosition
		: 'left';
	const totalItems = props.length ? props.length : 3;
	const mediaLength = totalItems - 1;

	let items = [];
	const content = (
		<Grid item xs={4} key="content">
			<CardContent
				sx={{
					color: 'white',
					backgroundColor: 'rgb(119, 24, 24)',
					height: '100%',
					position: 'relative',
					cursor: 'pointer',
					padding: '30px',
					transition: '300ms',
					':hover': { backgroundColor: 'rgb(87, 17, 17)' },
					':active': { backgroundColor: 'rgb(87, 17, 17)' },
				}}
			>
				<Typography
					sx={{
						fontSize: '30px',
						fontWeight: '500',
						color: 'white',
					}}
				>
					{props.item.Name}
				</Typography>

				<Typography
					sx={{
						marginTop: '10px',
						fontSize: '18px',
						color: 'white',
					}}
				>
					{props.item.Caption}
				</Typography>

				<Button
					variant="outlined"
					sx={{
						marginTop: '40px',
						color: 'white',
						fontSize: '25px',
						border: '3px solid white',
						textTransform: 'capitalize',
						transition: '200ms',
					}}
				>
					View Now
				</Button>
			</CardContent>
		</Grid>
	);

	for (let i = 0; i < mediaLength; i++) {
		const item = props.item.Items[i];

		const media = (
			<Grid item xs={4} key={item.Name}>
				<CardMedia
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
				>
					<Typography
						sx={{
							textOverflow: 'ellipsis',
							position: 'absolute',
							bottom: 0,
							padding: '15px',
							backgroundColor: 'black',
							color: 'white',
							opacity: 0.6,
							width: '100%',
							height: '10%',
							fontSize: '21px',
							fontWeight: 200,
							transition: '300ms',
							cursor: 'pointer',
							':hover': { opacity: 0.8 },
						}}
					>
						{item.Name}
					</Typography>
				</CardMedia>
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
		<Card raised sx={{ height: '400px', position: 'relative' }}>
			<Grid container spacing={0} sx={{ height: '100%', position: 'relative' }}>
				{items}
			</Grid>
		</Card>
	);
};

const items = [
	{
		Name: 'Electronics',
		Caption: 'Electrify your friends!',
		contentPosition: 'left',
		Items: [
			{
				Name: 'Macbook Pro',
				Image: 'https://source.unsplash.com/featured/?macbook',
			},
			{
				Name: 'iPhone',
				Image: 'https://source.unsplash.com/featured/?iphone',
			},
		],
	},
	{
		Name: 'Home Appliances',
		Caption: 'Say no to manual home labour!',
		contentPosition: 'middle',
		Items: [
			{
				Name: 'Washing Machine WX9102',
				Image: 'https://source.unsplash.com/featured/?washingmachine',
			},
			{
				Name: 'Learus Vacuum Cleaner',
				Image: 'https://source.unsplash.com/featured/?vacuum,cleaner',
			},
		],
	},
	{
		Name: 'Decoratives',
		Caption: 'Give style and color to your living room!',
		contentPosition: 'right',
		Items: [
			{
				Name: 'Living Room Lamp',
				Image: 'https://source.unsplash.com/featured/?lamp',
			},
			{
				Name: 'Floral Vase',
				Image: 'https://source.unsplash.com/featured/?vase',
			},
		],
	},
];

export default Example;
