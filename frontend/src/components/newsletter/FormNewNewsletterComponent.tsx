import { Fragment, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UsersNewsletterComponent from './UsersNewsletterComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormContentNewsletterComponent from './FormContentNewsletterComponent';
import FormProgramingNewsletterComponent from './FormProgramingNewsletterComponent';
import useFetchNewsletter from '../../hooks/useFetchNewsletter';
import { NewNewsletterState } from '../../context/features/newsletter/NewNewsleterSlice';

type Props = {
  open: boolean;
  handleClose: () => void;
}

const steps = [
  {
    label: 'Seleccion de usuarios',
    description: <UsersNewsletterComponent />
  },
  {
    label: 'Creacion de newsletter',
    description: <FormContentNewsletterComponent />,
  },
  {
    label: 'Programacion de envio',
    description: <FormProgramingNewsletterComponent />,
  },
];

function FormNewNewsletterComponent({ open, handleClose }: Props) {

  const newNewsletterState = useSelector((state: RootState) => state.newNewsletter)
  const {sendNewsletter} = useFetchNewsletter();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = async () => {
    //handleClose();
    console.log(newNewsletterState);
    const trySendForm = await sendNewsletter(newNewsletterState as NewNewsletterState);
    console.log(trySendForm);
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Nuevo Newsletter</DialogTitle>
        <DialogContent>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  {step.description}

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index === steps.length - 1 ? (
                        null
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Siguiente
                        </Button>
                      )}

                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                      {index === steps.length - 1 && (
                        <Button
                          variant="contained"
                          onClick={handleFinish}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Finish
                        </Button>
                      )}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default FormNewNewsletterComponent