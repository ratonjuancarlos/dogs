import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function ImageDialog({ onClose, selectedImage, open, breed }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{breed}</DialogTitle>
      <img src={selectedImage} alt={breed} />
    </Dialog>
  );
}

ImageDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedImage: PropTypes.string.isRequired,
  breed: PropTypes.string,
};

export default ImageDialog;
