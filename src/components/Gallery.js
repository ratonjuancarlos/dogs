import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import random from "lodash/random";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.common.white,
  },
  titleBar: {
    background:
    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
}));

const Gallery = ({ images, breed, subBreed }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={450} cols={3}>
        {images.map((image) => (
          <GridListTile key={image}>
            <img src={image} alt={breed} />
            <GridListTileBar
              title={`${breed} ${subBreed ? subBreed : ""}`}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
  breed: PropTypes.string,
  subBreed: PropTypes.string,
};

export default Gallery;
