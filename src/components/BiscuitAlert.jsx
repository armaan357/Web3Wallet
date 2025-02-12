import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function TransitionsSnackbar({ state, setState, message }) {

  const handleClick = () => () => {
    setState({
      open: true,
      Transition: Slide
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={message}
        key={state.Transition.name}
        autoHideDuration={3000}
      />
    </div>
  );
}
