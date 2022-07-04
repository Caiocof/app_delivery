import { Snackbar, AlertProps, Alert } from '@mui/material'
import { useState, forwardRef, useEffect, useContext } from 'react'
import Slide, { SlideProps } from '@mui/material/Slide';
import { MessageContext } from '../../../contexts/messageContexts';

type TransitionProps = Omit<SlideProps, 'direction'>;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}


const SnackAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />
  }
)

export type typeMessageProps = 'success' | 'error' | 'info' | 'warning'
interface IMessage {
  message: string;
  typeMessage: typeMessageProps;
  show: boolean;
  onVisibleChange?: (value: boolean) => void;
}

export const Message = ({ message, typeMessage, onVisibleChange, show = false }: IMessage) => {
  const [open, setOpen] = useState(false)
  const { setMessageProps } = useContext(MessageContext)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return
    // }
    setOpen(false)
    setMessageProps({
      message: '',
      typeMessage: typeMessage,
      showMessage: false
    })
  }

  useEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(open)
    }
  }, [open])

  useEffect(() => {
    setOpen(show)
  }, [show])



  return (
    <Snackbar
      autoHideDuration={4000}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      TransitionComponent={TransitionUp}
    >
      <SnackAlert
        onClose={handleClose}
        severity={typeMessage}
        sx={{ width: '80%' }}>
        {message}
      </SnackAlert>
    </Snackbar>

  )
}