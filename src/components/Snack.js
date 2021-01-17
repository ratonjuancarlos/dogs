import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

const Snack = ({ message, open }) => {
  const [openSnack, setOpenSnack] = useState(() => open);

  useEffect(() => {
    setOpenSnack(open);
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={openSnack}
      onClose={() => setOpenSnack(false)}
      autoHideDuration={6000}
      message={message}
    />
  );
};

Snack.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
};

export default Snack;
