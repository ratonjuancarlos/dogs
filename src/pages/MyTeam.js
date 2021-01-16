import React, { useState } from "react";
import ls from "local-storage";
import groupBy from "lodash/groupBy";
import Typography from "@material-ui/core/Typography";
import DogCard from "components/DogCard";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import EmptyTeam from "components/EmptyTeam";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  breed: {
    marginBottom: 50,
  },
  subBreed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const MyTeam = (props) => {
  const classes = useStyles();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [myDogs, setMyDogs] = useState(() => ls("dogs"));
  const removeDog = (id) => {
    const updatedDogs = myDogs.filter((dog) => dog.id !== id);
    ls("dogs", updatedDogs);
    setMyDogs(updatedDogs);
    setOpenSnack(true);
  };
  const groupedDogs = groupBy(myDogs, "breed");
  const dogsKeys = Object.entries(groupedDogs);
  const handleClose = (_, reason) => {
    setOpenSnack(false);
  };
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        My team
      </Typography>
      {!dogsKeys.length > 0 ? (
        <EmptyTeam />
      ) : (
        dogsKeys.map(([breed, subBreeds]) => (
          <div className={classes.breed}>
            <Typography variant="h3" gutterBottom>
              {breed}
            </Typography>
            <div className={classes.subBreed}>
              {subBreeds.map((sb) => (
                <DogCard {...{ removeDog, sb, breed }} />
              ))}
            </div>
          </div>
        ))
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item Removed"
      />
    </div>
  );
};

MyTeam.propTypes = {};

export default MyTeam;
