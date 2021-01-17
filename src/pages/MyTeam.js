import React, { useState } from "react";
import ls from "local-storage";
import groupBy from "lodash/groupBy";
import Typography from "@material-ui/core/Typography";
import DogCard from "components/DogCard";
import { makeStyles } from "@material-ui/core/styles";
import EmptyTeam from "components/EmptyTeam";
import Snack from "components/Snack";
import {removeDog } from 'helpers/localStorageHelper';

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
  const remove = (id) => {
    const updatedDogs = removeDog(id)
    setMyDogs(updatedDogs);
    setOpenSnack(true);
  };
  const groupedDogs = groupBy(myDogs, "breed");
  const dogsKeys = Object.entries(groupedDogs);

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        My team
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can click on the image to see bigger or click on the name to go to de details breed.
      </Typography>
      {!dogsKeys.length > 0 ? (
        <EmptyTeam />
      ) : (
        dogsKeys.map(([breed, subBreeds]) => (
          <div key={breed} className={classes.breed}>
            <Typography variant="h3" gutterBottom>
              {breed}
            </Typography>
            <div className={classes.subBreed}>
              {subBreeds.map((sb) => (
                <DogCard key={`${breed}-${sb}`}  {...{ remove, sb, breed }}/>
              ))}
            </div>
          </div>
        ))
      )}
      <Snack message="Dog removed from your team" open={openSnack} />
    </div>
  );
};

MyTeam.propTypes = {};

export default MyTeam;
