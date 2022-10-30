import BackgroundComponent from '../../components/backgrounds/BackgroundComponent';
import { Container, Button } from '@mui/material';
import { Fragment, useState } from 'react';
import FormNewNewsletterComponent from '../../components/newsletter/FormNewNewsletterComponent';


export default function NewsletterPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <FormNewNewsletterComponent open={open} handleClose={handleClose} />

      <BackgroundComponent breadCrumb={[{ name: 'Newsletter', link: '/newsletter' }]} whitHeader>
        <Container>
          <Button variant="contained" onClick={handleOpen}>Crear Newsletter</Button>
        </Container>
      </BackgroundComponent>
    </Fragment>
  )
}

