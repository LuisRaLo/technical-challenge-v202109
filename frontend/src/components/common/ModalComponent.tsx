import { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    open: boolean;
    title: string;
    content: string;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onAccept: () => void;
    onCancel?: () => void;
}

export default function ModalComponent({ open, title, content, setOpen, onAccept, onCancel, }: Props) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {onCancel && <Button onClick={onCancel}>Cancelar</Button>}
                    {onAccept && <Button onClick={onAccept} autoFocus>
                        Agree
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
