import { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Checkbox, TextField } from '@mui/material';
import DateHelpers from '../../utils/helpers/DateHelper';
import { addPrograming } from '../../context/features/newsletter/NewNewsleterSlice';

export interface ProgramingNewsletterProps {
  sendNow: boolean;
  fecha: string,
  hora: string,
}

function FormProgramingNewsletterComponent() {

  const dispatch = useDispatch();

  const [programingNewsletter, setProgramingNewsletter] = useState<ProgramingNewsletterProps>({
    sendNow: true,
    fecha: DateHelpers.getCurrentDateWithFormat(),
    hora: DateHelpers.currentTime()
  });

  useEffect(() => {
    dispatch(addPrograming(programingNewsletter));
  }, [programingNewsletter])

  const onChange = (e: any) => {
    setProgramingNewsletter({
      ...programingNewsletter,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Fragment>
      <Box sx={{ width: '100%' }}>

        <Checkbox
          defaultChecked
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          onChange={() =>
            setProgramingNewsletter(
              {
                ...programingNewsletter,
                sendNow: !programingNewsletter.sendNow
              })
          }

        />
        Enviar ahora
        {!programingNewsletter.sendNow && (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch', mb: 5 },
            }}
            noValidate
            autoComplete="off"
            justifyContent="center"
            alignItems="center"
            display="flex"
          >

            <TextField
              id="fecha"
              name="fecha"
              label="Fecha"
              type="date"
              defaultValue={
                programingNewsletter.fecha
              }
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
              inputProps={{ min: DateHelpers.getCurrentDateWithFormat() }}
              sx={{ width: '100%' }}
            />
            <TextField
              id="hora"
              name="hora"
              label="Hora"
              type="time"
              defaultValue={programingNewsletter.hora}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={onChange}
              sx={{ width: '100%' }}
            />
          </Box>

        )}
      </Box>
    </Fragment >
  );
}

export default FormProgramingNewsletterComponent