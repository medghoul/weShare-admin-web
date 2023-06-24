import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './SnackBarComponent.module.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = (props) => {


  return (
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }} open={props.open} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} autoHideDuration={props.autoHideDuration} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
  );
};

export default SnackbarComponent;