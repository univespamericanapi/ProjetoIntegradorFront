import React, { Component } from 'react';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import api from '../../services/api';
import { deepOrange } from '@mui/material/colors';

export class Confirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
		this.CosplayCircuito = 'Cosplay Circuito';
		this.CosplayDesfile = 'Cosplay Desfile';
		this.Karaoke = 'Karaoke';
		this.KpopCircuito = 'Kpop Circuito';
		this.KpopSolo = 'Kpop Solo / Duo';
	}

	continue = async (e) => {
		this.setState({ loading: true });
		e.preventDefault();

		const { values } = this.props;

		const competidor = {
			comp_email: values.comp_email,
			comp_nome: values.comp_nome,
			comp_nome_social: values.comp_nome_social,
			comp_cpf: values.comp_cpf.replace(/\D/g, ''),
			comp_nasc: values.comp_nasc,
			comp_whats: values.comp_whats.replace(/\D/g, ''),
			comp_cidade: values.comp_cidade,
		};
		const apresentacao = {
			apres_nome: values.apres_nome,
			apres_origem: values.apres_origem,
			apres_link_ref: values.apres_link_ref,
		};
		const participacao = {
			part_event: values.part_event,
			part_conc: values.part_conc,
			part_aceit_regul: values.part_aceit_regul,
		};
		const extra = {
			extra_categ: values.extra_categ,
			extra_integ: values.extra_integ,
			extra_estil: values.extra_estil,
			extra_link_av: values.extra_link_av,
			extra_mat: values.extra_mat,
			extra_mod: values.extra_mod,
		};
		const data = { competidor, apresentacao, participacao, extra };

		try {
			const response = await api.post('participante/cadastro/criar', data);
			this.props.successMsgSave(response);
		} catch (error) {
			console.error(error);
			this.props.successMsgSave({
				error,
			});
		}

		this.props.nextStep();
		this.setState({ loading: false });
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	switchExtra = (values) => {
		switch (values.part_conc_nome) {
			case this.CosplayDesfile:
				return (
					<TableRow
						key={'extra_categ_nome'}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell component="th" scope="row">
							{'Categoria'}
						</TableCell>
						<TableCell align="right">{values.extra_categ_nome}</TableCell>
					</TableRow>
				);
			case this.CosplayCircuito:
				return (
					<React.Fragment>
						<TableRow
							key={'extra_integ'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Integrantes'}
							</TableCell>
							<TableCell align="right">{values.extra_integ}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_estil_nome'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Estilo'}
							</TableCell>
							<TableCell align="right">{values.extra_estil_nome}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_link_av'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Link Áudio / Vídeo'}
							</TableCell>
							<TableCell align="right"><a href={'http://' + values.extra_link_av_short} target='_blank' rel="noreferrer">{'http://' + values.extra_link_av_short}</a></TableCell>
						</TableRow>
					</React.Fragment>
				);
			case this.Karaoke:
				return <Box></Box>;
			case this.KpopCircuito:
				return (
					<React.Fragment>
						<TableRow
							key={'extra_integ'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Integrantes'}
							</TableCell>
							<TableCell align="right">{values.extra_integ}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_estil_nome'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Material'}
							</TableCell>
							<TableCell align="right">{values.extra_mat}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_link_av'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Link Áudio / Vídeo'}
							</TableCell>
							<TableCell align="right"><a href={'http://' + values.extra_link_av_short} target='_blank' rel="noreferrer">{'http://' + values.extra_link_av_short}</a></TableCell>
						</TableRow>
					</React.Fragment>
				);
			case this.KpopSolo:
				return (
					<React.Fragment>
						<TableRow
							key={'extra_integ'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Integrantes'}
							</TableCell>
							<TableCell align="right">{values.extra_integ}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_estil_nome'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Modalidade'}
							</TableCell>
							<TableCell align="right">{values.extra_mod_nome}</TableCell>
						</TableRow>
						<TableRow
							key={'extra_link_av'}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{'Link Áudio / Vídeo'}
							</TableCell>
							<TableCell align="right"><a href={'http://' + values.extra_link_av_short} target='_blank' rel="noreferrer">{'http://' + values.extra_link_av_short}</a></TableCell>
						</TableRow>
					</React.Fragment >
				);
			default:
				return;
		}
	};

	render() {
		const { values } = this.props;
		const { loading } = this.state;
		return (
			<React.Fragment>
				<Box
					sx={{
						width: '90%',
						marginTop: '1.875rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<Button
							sx={{ margin: '.625rem', width: '7.5rem' }}
							variant="contained"
							onClick={this.back}
						>
							Voltar
						</Button>
						<Button
							sx={{ margin: '.625rem', width: '7.5rem' }}
							variant="contained"
							onClick={this.continue}
							disabled={loading}
						>
							Enviar
						</Button>
					</Box>
					<h1>Informações Para Confirmação</h1>
					<TableContainer
						sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
					>
						<Table sx={{ maxWidth: '600px' }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Campo</TableCell>
									<TableCell>Dados</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow
									key={
										values.comp_nome_social ? 'comp_nome_social' : 'comp_nome'
									}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{values.comp_nome_social ? 'Nome Social' : 'Nome Completo'}
									</TableCell>
									<TableCell align="right">
										{values.comp_nome_social
											? values.comp_nome_social
											: values.comp_nome}
									</TableCell>
								</TableRow>

								<TableRow
									key={
										values.comp_nome_social ? 'comp_nome' : 'comp_nome_social'
									}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{values.comp_nome_social ? 'Nome Completo' : 'Nome Social'}
									</TableCell>
									<TableCell align="right">
										{values.comp_nome_social
											? values.comp_nome
											: values.comp_nome_social}
									</TableCell>
								</TableRow>

								<TableRow
									key={'comp_email'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'E-Mail'}
									</TableCell>
									<TableCell align="right">{values.comp_email}</TableCell>
								</TableRow>

								<TableRow
									key={'comp_cpf'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'CPF'}
									</TableCell>
									<TableCell align="right">{values.comp_cpf}</TableCell>
								</TableRow>

								<TableRow
									key={'comp_nasc'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Data de Nascimento'}
									</TableCell>
									<TableCell align="right">{values.comp_nasc}</TableCell>
								</TableRow>

								<TableRow
									key={'comp_whats'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Whatsapp'}
									</TableCell>
									<TableCell align="right">{values.comp_whats}</TableCell>
								</TableRow>

								<TableRow
									key={'comp_cidade_nome'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Cidade'}
									</TableCell>
									<TableCell align="right">{values.comp_cidade_nome}</TableCell>
								</TableRow>

								<TableRow
									key={'comp_estado_nome'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Estado'}
									</TableCell>
									<TableCell align="right">{values.comp_estado_nome}</TableCell>
								</TableRow>

								<TableRow
									key={'apres_nome'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Personagem / Música'}
									</TableCell>
									<TableCell align="right">{values.apres_nome}</TableCell>
								</TableRow>

								<TableRow
									key={'apres_origem'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Origem'}
									</TableCell>
									<TableCell align="right">{values.apres_origem}</TableCell>
								</TableRow>

								<TableRow
									key={'apres_link_ref'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Link de Referência'}
									</TableCell>
									<TableCell align="right"><a href={'http://' + values.apres_link_ref_short} target='_blank' rel="noreferrer">{'http://' + values.apres_link_ref_short}</a></TableCell>
								</TableRow>

								<TableRow
									key={'part_event_nome'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Evento'}
									</TableCell>
									<TableCell align="right">{values.part_event_nome}</TableCell>
								</TableRow>

								<TableRow
									key={'part_conc_nome'}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{'Concurso'}
									</TableCell>
									<TableCell align="right">{values.part_conc_nome}</TableCell>
								</TableRow>

								{this.switchExtra(values)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
				{loading && (
					<Box
						sx={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: '0',
							left: '0',
							backgroundColor: 'rgba(0, 0, 0, 0.9)',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<CircularProgress
							size={36}
							sx={{
								color: deepOrange[500],
								filter: 'drop-shadow(0 0 0.5rem #ffab91)',
								margin: '2rem',
							}}
						/>
						<Typography
							sx={{
								color: deepOrange[500],
								margin: '2rem',
							}}
							variant="h4"
							component="h4"
						>
							Carregando, aguarde...
						</Typography>
					</Box>
				)}
			</React.Fragment>
		);
	}
}

export default Confirm;
