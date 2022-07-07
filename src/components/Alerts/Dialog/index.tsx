import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from '../../Button';
import { mainColor } from '../../../utils';

interface CustomDialogProps {
  showDialog: boolean;
  title: string;
  description: string;
  isClicked?: () => void;
  onHandleClose?: (value: boolean) => void;
}

export function CustomDialog({
  title,
  description,
  isClicked = () => { },
  onHandleClose,
  showDialog = false,
}: CustomDialogProps) {
  const [open, setOpen] = useState(showDialog);

  const handleClose = () => {
    if (onHandleClose) {
      onHandleClose(false);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (showDialog) {
      setOpen(true);
    }
  }, [showDialog]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            title="Sim"
            borderColor={mainColor}
            buttonColor="#FFF"
            titleColor="#1B1B1B"
            autoFocus
            isClicked={() => {
              handleClose();
              isClicked();
            }}
          />
          <Button
            title="Não"
            borderColor={mainColor}
            buttonColor="#FFF"
            titleColor="#1B1B1B"
            isClicked={handleClose}
            autoFocus
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog;
