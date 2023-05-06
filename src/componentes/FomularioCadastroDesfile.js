import * as React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function FormularioCadastroDisfile2() {
    const handleAceite = (event, value) => {
        localStorage.setItem('part_aceit_regul', true)
    }

    return (
        <Box
            sx={{
                minWidth: 130,
                border: '1px solid white',
                padding: '1rem',
                borderRadius: '30px',
                width: '60%',
                height: '60%',
                backgroundColor: '#FF914D',
                position: 'relative',
            }}
        >
            <h2 style={{ color: 'white' }}>Regras do concurso:</h2>
            <p>AO PROSSEGUIR VOCÊ CONCORDA COM TODAS AS REGRAS DO CONCURSO</p>

            <div
                className="Botao"
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Link to={'/'}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#5C2863',
                            width: '250px',
                            borderRadius: '50px',
                            fontWeight: 'Bold',
                        }}
                    >
                        CANCELAR
                    </Button>
                </Link>
            </div>

            <div
                className="Botao"
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '5%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Link to={'/CadastroDesfile2'}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#5C2863',
                            width: '250px',
                            borderRadius: '50px',
                            fontWeight: 'Bold',
                        }}
                        onClick={handleAceite}
                    >
                        ACEITAR
                    </Button>
                </Link>
            </div>
        </Box>
    )
}
