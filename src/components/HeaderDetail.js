import React from "react";
import PropTypes from "prop-types";
import ls from "local-storage";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const HeaderDetail = ({ breed, subBreed, image }) => {
  const classes = useStyles();
  const saveDog = (breed, subBreed) => {
    if (!ls("dogs")) {
      ls("dogs", []);
    }
    let myDogs = ls("dogs");
    myDogs = [
      ...myDogs,
      subBreed
        ? { id: `${breed}${subBreed}`, breed, subBreed, image }
        : { id: breed, breed, image },
    ];
    ls("dogs", uniqWith(myDogs, isEqual));
  };

  return (
    <div className={classes.header}>
      <div>
        <Typography variant="h4" gutterBottom>
          {breed}
        </Typography>
        {subBreed && (
          <Typography variant="h5" gutterBottom>
            {subBreed}
          </Typography>
        )}
      </div>
      <div>
        <Button
          data-test="save-dog"
          onClick={() => saveDog(breed, subBreed)}
          variant="contained"
          color="primary"
        >
          Save to my team
        </Button>
      </div>
    </div>
  );
};

HeaderDetail.propTypes = {
    breed: PropTypes.string,
    subBreed: PropTypes.string,
    image: PropTypes.string,
};

export default HeaderDetail;
