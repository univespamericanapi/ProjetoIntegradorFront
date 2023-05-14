import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledTabs = styled((props) => (
	<Tabs
		sx={{ display: { xs: 'none', md: 'flex' } }}
		{...props}
		TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
	/>
))({
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	'& .MuiTabs-indicatorSpan': {
		maxWidth: 40,
		width: '100%',
		backgroundColor: deepOrange[500],
	},
});

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: 'none',
		width: '100%',
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		color: '#fff',
		fontWeight: 700,
		transition: theme.transitions.create(),
		'&.Mui-selected': {
			color: deepOrange[500],
			backgroundColor: '#fff',
			textDecoration: 'underline 2px',
		},
		'&.Mui-focusVisible': {
			backgroundColor: '#572d7f',
		},
	})
);
