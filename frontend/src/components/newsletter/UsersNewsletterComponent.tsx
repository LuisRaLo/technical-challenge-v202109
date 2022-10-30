import { useEffect, useState, Fragment } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Backdrop, CircularProgress, Grid, Button } from '@mui/material';
import useFetchUsuarios from '../../hooks/useFetchUsuarios';
import IUsuario from '../../utils/interfaces/IUsuario';
import { useDispatch, useSelector } from 'react-redux';
import DialogContentText from '@mui/material/DialogContentText';

import { addUsers } from '../../context/features/newsletter/NewNewsleterSlice';

function UsersNewsletterComponent() {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([])

  const dispatch = useDispatch()

  const { getUsuariosNewsletter } = useFetchUsuarios();

  const tryGetUsuarios = async () => {
    const tryGetUsers = await getUsuariosNewsletter();
    setUsuarios(tryGetUsers);
    setLoading(false);
  }

  useEffect(() => {
    tryGetUsuarios();
  }, [])

  const columns: GridColDef[] = [
    { field: 'usuario_id', headerName: 'Id', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'rol', headerName: 'Rol', width: 130 }
  ];

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

    <Fragment>
      <div style={{ height: 400, width: '100%' }}>
        <DialogContentText>
          A continuación se muestran los usuarios que se enviarán el newsletter.
          Puedes seleccionar o deseleccionar los usuarios que desees.
          <br />
          <b>Puedes filtar los campos de la tabla haciendo click en el nombre de la columna.</b>
          <br />
          <br />
        </DialogContentText>
        <DataGrid
          rows={usuarios}
          columns={columns}
          getRowId={(row: IUsuario) => row.usuario_id as number}
          pageSize={5}
          rowsPerPageOptions={[5, 15, 50]}
          checkboxSelection
          onSelectionModelChange={(newSelection: any) => {
            dispatch(addUsers(newSelection.map((id: number) => usuarios.find((usuario) => usuario.usuario_id === id) as IUsuario)))
          }}

        />
      </div>
    </Fragment>
  );
}

export default UsersNewsletterComponent