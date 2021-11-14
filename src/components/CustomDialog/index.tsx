import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

interface CustomDialogProps {
  handleClose : () => {},
  submitHandler : () => {},
  open : boolean,
  title : string ,
  content : string
}


export default function CustomDialog(props : CustomDialogProps){

  const {handleClose, open , submitHandler , title, content} = props ;

  return (
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} color={'info'} onClick={handleClose}>Cancel</Button>
          <Button variant={'contained'} color={'error'} onClick={submitHandler}  autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  )
}
