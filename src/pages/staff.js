import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledTab, StyledTabs } from '../styles/StyledTabs';
import { deepOrange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FlexBoxColumn } from '../styles/MuiTheme';
import UserService from '../services/user';
import EventBus from '../common/eventBus';
import { withRouter } from '../common/withRouter';
import { Card, CardActionArea, CardContent } from '@mui/material';
import Checkin from '../components/staff/checkin';

//imports da tabela personalizada
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';

//imports dos combobox
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//componente para o botão
import Button from '@mui/material/Button';

//componente para organizar melhor o layout
import Stack from '@mui/material/Stack';

//variaveis para a customização da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#572d7f',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//variaveis usadas para carregar os eventos no combobox
const eventos = [
  { label: '1º Mega Campinas Anime Fest', year: 2023 },
];

const concursos = [
  { label: 'Cosplay Circuito', year: 2023 },
  { label: 'Cosplay Desfile', year: 2023 },
  { label: 'Kpop Solo / Duo', year: 2023 },
  { label: 'Karaoke', year: 2023 },
  { label: 'Kpop Circuito', year: 2023 },
];

//variáveis usabas para carregar relatório, devem ser substituídas pelo backend
function createData(id, name, cpf, email, cel) {
  return { id, name, cpf, email, cel };
}

//constante para o separador usado no layout do relatório
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

class StaffBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      logged: true,
      value: 0,
      searchData: [], // Estado para armazenar os dados da tabela
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    UserService.getStaffBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
        this.setLogged(true);
      },
      (error) => {
        this.setState({ content: error.response?.data?.message || error.message || error.toString() });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }

        this.setLogged(false);

        this.props.logOut();

        this.props.router.navigate('/login');
        window.location.reload();
      }
    );
  }

  setLogged = (bol) => {
    this.setState({
      logged: bol,
    });
  };

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  render() {
    const { value, logged, searchData } = this.state;
    const AdminFlexBoxColumn = { ...FlexBoxColumn };
    AdminFlexBoxColumn.padding = '2.5rem';

    this.TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };

    const TabPanel = this.TabPanel;

    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
      };
    }

    return (
      <Box>
        {logged ? (
          <Box
            sx={{
              width: '100%',
              flexGrow: 1,
              display: 'flex',
            }}
          >
            <StyledTabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={this.handleChange}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                width: '18.75rem',
                bgcolor: deepOrange[500],
                minHeight: 'calc(100dvh - 4.25rem)',
              }}
            >
              <StyledTab label="Início" {...a11yProps(0)} />
              <StyledTab label="Checkin" {...a11yProps(1)} />
              <StyledTab label="Relatório de Candidatos" {...a11yProps(2)} />
            </StyledTabs>

            <TabPanel value={value} index={0} style={{ width: '100%' }}>
              <Box sx={AdminFlexBoxColumn}>
                <Card sx={{ width: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Staff Board
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {this.state.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '100%' }}>
              <Checkin {...this.props} setLogged={this.setLogged} />
            </TabPanel>
            <TabPanel value={value} index={2} style={{ width: '100%' }}>
              <h1>Relatório de candidatos</h1>
              <Stack spacing={2}>
                <Item>
                  <Stack direction="row" spacing={2}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-eventos"
                      options={eventos}
                      sx={{ width: 600 }}
                      renderInput={(params) => <TextField {...params} label="Evento" />}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-concursos"
                      options={concursos}
                      sx={{ width: 600 }}
                      renderInput={(params) => <TextField {...params} label="Concurso" />}
                    />
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const searchedData = [
                        createData(1, 'Alice Silva', '645.375.480-02', 'aliceSilva@testeMail.com', '(19)9999-0000'),
                        createData(2, 'Bruno Ramos', '110.100.200-05', 'brunoRamos@testeMail.com', '(19)9999-1111'),
                        createData(3, 'Camila Lima', '544.954.830-30', 'camilaLima@testeMail.com', '(19)9999-2222'),
                        createData(4, 'Denis Souza', '902.450.140-71', 'denisSouza@testeMail.com', '(19)9999-3333'),
                        createData(5, 'Eliana Pereira', '085.372.990-57', 'elianePereira@testeMail.com', '(19)9999-4444'),
                        createData(6, 'Flavio Mattos', '161.475.380-63', 'flaviomattos@testeMail.com', '(19)9999-5555'),
                        createData(7, 'Giovana Berg', '893.088.080-00', 'giovanaberg@testeMail.com', '(19)9999-6666'),
                        createData(8, 'Heitor Ferreira', '938.847.270-52', 'heitofereira@testeMail.com', '(19)9999-7777'),
                        createData(9, 'Ingrid Moura', '132.976.020-40', 'ingridmoura@testeMail.com', '(19)9999-8888'),
                        createData(10, 'Jaime Costa', '917.864.840-80', 'jaimecosta@testeMail.com', '(19)9999-9999'),
                        createData(11, 'Kate Carvalho', '592.558.560-73', 'katecarvalho@testeMail.com', '(19)9999-1010'),
                        createData(12, 'Leonardo Bragança', '602.491.780-52', 'leonardobraganca@testeMail.com', '(19)9999-1212'),
                        createData(13, 'Mariana Ferrari', '070.045.280-06', 'marianaferrari@testeMail.com', '(19)9999-1313'),
                        createData(14, 'Natan Braga', '979.035.370-75', 'natanbraga@testeMail.com', '(19)9999-1414'),
                        createData(15, 'Patricia Pontes', '204.127.980-00', 'patriciapontes@testeMail.com', '(19)9999-1515'),
                      ];

                      this.setState({
                        searchData: searchedData,
                      });
                    }}
                  >
                    Pesquisar
                  </Button>
                </Item>
                <Item>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>ID</StyledTableCell>
                          <StyledTableCell align="left">Nome</StyledTableCell>
                          <StyledTableCell align="left">CPF</StyledTableCell>
                          <StyledTableCell align="left">E-Mail</StyledTableCell>
                          <StyledTableCell align="left">Celular/WhatsApp</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {searchData.length > 0 ? (
                          searchData.map((row) => (
                            <StyledTableRow key={row.id}>
                              <StyledTableCell component="th" scope="row">
                                {row.id}
                              </StyledTableCell>
                              <StyledTableCell align="left">{row.name}</StyledTableCell>
                              <StyledTableCell align="left">{row.cpf}</StyledTableCell>
                              <StyledTableCell align="left">{row.email}</StyledTableCell>
                              <StyledTableCell align="left">{row.cel}</StyledTableCell>
                            </StyledTableRow>
                          ))
                        ) : (
                          <StyledTableRow>
                            <StyledTableCell colSpan={5} align="center">
                              Nenhum dado encontrado.
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              </Stack>
            </TabPanel>
          </Box>
        ) : (
          <Box>
            {this.props.router.navigate('/login')}
            {window.location.reload()}
          </Box>
        )}
      </Box>
    );
  }
}

export default withRouter(StaffBoard);
