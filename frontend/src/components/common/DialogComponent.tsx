import { Fragment, useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../context/Authentication/AuthContext";

export default function AlertDialogComponent() {
  const { errorMessage, removeError } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!errorMessage) return setOpen(false);
    return setOpen(true);
  }, [errorMessage]);

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => {
          removeError();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorMessage?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              removeError();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
