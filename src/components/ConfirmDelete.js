import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Book deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You want to delete {props.book.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => props.deleteBook(props.book)} color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
