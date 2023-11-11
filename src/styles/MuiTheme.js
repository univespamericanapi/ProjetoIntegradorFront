import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

export const deepPurpleTheme = createTheme({
	palette: {
		primary: {
			main: '#572d7f',
		},
	},
});

export const deepOrangeTheme = createTheme({
	palette: {
		primary: {
			main: deepOrange[500],
		},
	},
});

export const FlexBoxColumn = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	flexGrow: 1,
};

export const loginBox = {
	width: '25rem',
	padding: '2.5rem',
	backgroundColor: '#f7f7f7',
	margin: '3.75rem auto ',
	borderRadius: '1.25rem',
	boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	minWidth: '0',
	wordWrap: 'break-word',
	backgroundClip: 'border-box',
	border: '1px solid rgba(0,0,0,.125)',
};

export const inputLoginBox = {
	display: 'flex',
	alignItems: 'flex-end',
	position: 'relative',
	marginBottom: '1.5rem',
	width: '100%',
};

export const inputLoginErrors = {
	color: 'rgb(235, 54, 54)',
	marginTop: '-1rem',
	fontSize: '0.875rem',
	marginBottom: '1.25rem',
};

export const loginErrors = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	color: 'rgb(235, 54, 54)',
	marginTop: '0.625rem',
	fontSize: '1rem',
	marginBottom: '1.25rem',
	fontWeight: 700,
};

export const inputErrors = {
	color: 'rgb(235, 54, 54)',
	marginTop: '-2.625rem',
	fontSize: '0.875rem',
	marginBottom: '1.25rem',
	zIndex: 10,
};

export const titleListasInscr = {
	color: '#572d7f',
	marginBottom: '10px',
};