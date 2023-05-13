import React, { Component } from 'react';
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

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
						{this.props.item.Name}
					</Typography>

					<Typography
						sx={{
							marginTop: '10px',
							fontSize: '18px',
							color: 'white',
						}}
					>
						{this.props.item.Caption}
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
			const item = this.props.item.Items[i];

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

export default Banner;
