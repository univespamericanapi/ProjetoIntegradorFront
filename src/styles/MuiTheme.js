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
	width: '400px',
	padding: '40px',
	backgroundColor: '#f7f7f7',
	margin: '60px auto ',
	borderRadius: '20px',
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
	marginBottom: '24px',
	width: '100%',
};

export const inputLoginErrors = {
	color: 'rgb(235, 54, 54)',
	marginTop: '-15px',
	fontSize: '14px',
	marginBottom: '20px',
};

export const loginErrors = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	color: 'rgb(235, 54, 54)',
	marginTop: '10px',
	fontSize: '16px',
	marginBottom: '20px',
	fontWeight: 700,
};

export const inputErrors = {
	color: 'rgb(235, 54, 54)',
	marginTop: '-41px',
	fontSize: '14px',
	marginBottom: '20px',
	zIndex: 10,
};
