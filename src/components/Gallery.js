import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ImageDialog from 'components/ImageDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const Gallery = ({ images, breed, subBreed }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const classes = useStyles();
  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={600} cols={2.5}>
        {images.map((image) => (
          <GridListTile key={image}>
            <img
              src={image}
              alt={breed}
              onClick={() => handleClickOpen(image)}
            />
            <GridListTileBar
              title={`${breed} ${subBreed ? subBreed : ""} - Click to open it`}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
      <ImageDialog
        selectedImage={selectedImage}
        open={open}
        breed={breed}
        onClose={handleClose}
      />
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
  breed: PropTypes.string,
  subBreed: PropTypes.string,
};

export default Gallery;
