import React, { Component } from 'react';
import { Button, Typography, Box } from '@mui/material';

export class Success extends Component {
	reset = (e) => {
		e.preventDefault();
		this.props.resetAll();
	};
	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { successMsg } = this.props;

		return (
			<React.Fragment>
				<Box
					sx={{
						margin: '20px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="h6">
						{successMsg.value.error ? (
							<p
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '30px',
								}}
							>
								<strong>
									<p
										style={{
											textAlign: 'center',
										}}
									>
										{successMsg.value.error.code}
									</p>
									<p
										style={{
											textAlign: 'center',
										}}
									>
										{' Status code: '} {successMsg.value.error.response.status}
									</p>
								</strong>
								<p
									style={{
										textAlign: 'center',
									}}
								>
									{successMsg.value.error.response.data}
								</p>
							</p>
						) : (
							<p
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '30px',
								}}
							>
								<strong>
									<p
										style={{
											textAlign: 'center',
										}}
									>
										Sucesso!
									</p>
								</strong>
								<p
									style={{
										textAlign: 'center',
									}}
								>
									{successMsg.value.data}
								</p>
							</p>
						)}
					</Typography>
				</Box>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-around',
					}}
				>
					<Button
						sx={{ margin: '10px', width: '120px' }}
						variant="contained"
						onClick={this.back}
					>
						Voltar
					</Button>
					<Button
						sx={{ margin: '10px', width: '120px' }}
						variant="contained"
						onClick={this.reset}
					>
						Resetar
					</Button>
				</Box>
			</React.Fragment>
		);
	}
}

export default Success;
