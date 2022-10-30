import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { Box, FormControl, FormControlLabel, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { addContenido } from '../../context/features/newsletter/NewNewsleterSlice';

import Typography from '@mui/material/Typography';

export interface ContenidoTotal {
  titulo: string;
  asunto: string;
  contenido: string;
  attachments?: File[]
}


function FormContentNewsletterComponent() {

  const dispatch = useDispatch();

  const [htmlContent, setHtmlContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [contenidoTotal, setContenidoTotal] = useState<ContenidoTotal>({
    titulo: '',
    asunto: '',
    contenido: '',
    attachments: []
  });

  useEffect(() => {
    dispatch(addContenido(contenidoTotal));
  }, [contenidoTotal])

  const onChange = (e: any) => {
    setContenidoTotal({
      ...contenidoTotal,
      [e.target.name]: e.target.value
    })
  }

  const processStringtoHTML: any = (string: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, 'text/html');
    const html = doc.body.innerHTML;
    setHtmlContent(html);
    onChange({ target: { name: 'contenido', value: html } })
  }

  const previewHTML = () => {
    const preview = document.getElementById('preview');
    if (preview) {
      preview.innerHTML = htmlContent;
    }
  }

  useEffect(() => {
    previewHTML();
  }, [htmlContent])


  return (
    <Fragment>

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
          id="titulo"
          name='titulo'
          label="Titulo del newsletter"
          variant="outlined"
          onChange={(e) => onChange(e)}
          sx={{ width: '100%' }}
        />
        <TextField
          id="asunto"
          name='asunto'
          label="Asunto del newsletter"
          variant="outlined"
          onChange={(e) => onChange(e)}
          sx={{ width: '100%' }}

        />

      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        marginBottom={5}
      >
        <Typography component="div" gutterBottom>
          Selecciona uno o más archivos que quieras adjuntar
        </Typography>

        <Button
          variant="outlined"
          component="label"
          sx={{ width: '100%' }}
        >
          {files.length > 0 ? files[0].name : 'Subir Archivo'}
          <input
            type="file"
            hidden
            onChange={(e) => {
              setFiles([...files, e.target.files![0]]);
              setContenidoTotal({
                ...contenidoTotal,
                attachments: [...files, e.target.files![0]]
              })
            }}
            onClick={(e) => {
              setFiles([]);
              setContenidoTotal({
                ...contenidoTotal,
                attachments: []
              })
            }}
            accept="image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
          />
        </Button>
      </Box>

      <FormControl fullWidth>
        <TextField
          id="contenido-html"
          label="Agrega el contenido de tu newsletter, puedes usar HTML"
          multiline
          rows={4}
          onChange={(e) => processStringtoHTML(e.target.value)}
        />
      </FormControl>

      <br /><br /><br />

      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom component="div">
          Preview del newsletter que se enviará en formato HTML
        </Typography>
        <div id="preview" style={{ width: '100%', height: '100%', border: '1px solid #ccc', padding: '10px', boxShadow: '0 0 10px #ccc' }}></div>
      </Box>

    </Fragment>
  );
}

export default FormContentNewsletterComponent