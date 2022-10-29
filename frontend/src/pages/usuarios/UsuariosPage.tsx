import { useState, useEffect, useContext } from 'react'
import BackgroundComponent from '../../components/backgrounds/BackgroundComponent'
import useFetchUsuarios from '../../hooks/useFetchUsuarios';
import IUsuario from '../../utils/interfaces/IUsuario';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Grid } from "@mui/material";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import healthyTheme from '../../themes/theme';

function UsuariosPage() {
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])


    const { getUsuarios } = useFetchUsuarios();

    const tryGetUsuarios = async () => {
        const tryGetUsers = await getUsuarios();
        setUsuarios(tryGetUsers);
        setLoading(false);
    }

    useEffect(() => {
        tryGetUsuarios();

    }, [])

    const handleUpdate = (usuario: IUsuario) => {
        console.log(usuario);
    }

    const handleDelete = (usuario: IUsuario) => {
        console.log(usuario);
    }


    if (usuarios.length === 0) {
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }

    return (
        <BackgroundComponent breadCrumb={[{ name: "Usuarios", link: "users" }]} whitHeader={true}>

            <Container maxWidth="lg">
                <Grid container marginTop={5} spacing={2} mb={10}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell>rol</StyledTableCell>
                                    <StyledTableCell align="center">email</StyledTableCell>
                                    <StyledTableCell align="center">Nombre</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">Creado</StyledTableCell>
                                    <StyledTableCell align="center">Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map((usuario: IUsuario, index: number) => (
                                    <StyledTableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {usuario.rol}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{usuario.email}</StyledTableCell>
                                        <StyledTableCell align="center">{usuario.persona?.nombre + ' ' + usuario.persona?.apaterno}</StyledTableCell>
                                        <StyledTableCell align="center">{usuario.isActive}</StyledTableCell>
                                        <StyledTableCell align="center">{new Date(usuario.createdAt).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleUpdate(usuario)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(usuario)}
                                            >
                                                Eliminar
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow >
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container>
        </BackgroundComponent>
    )
}

export default UsuariosPage


const StyledTableCell: any = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: healthyTheme.palette.primary.main,
        color: healthyTheme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow: any = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: healthyTheme.palette.primary.light,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));