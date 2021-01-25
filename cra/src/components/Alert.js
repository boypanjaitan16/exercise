import React from 'react';
import {connect, useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbars({error}) {

    const dispatch  = useDispatch()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type    : 'CLEAR_ERROR',
        })
    };

    return (
        <Snackbar 
            anchorOrigin={{ vertical : 'top', horizontal: 'center' }}
            open={!!error} 
            autoHideDuration={6000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={error?.severity ?? 'error'}>
            {error?.message}
            </Alert>
        </Snackbar>
    );
}

const mapStateToProps = (state, props) => {
    return {
        error   : state.error
    }
}

export default connect(mapStateToProps)(CustomizedSnackbars)