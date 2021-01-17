import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Breed from "components/Breed";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [breeds, setBreeds] = useState();
  // const [filteredBreeds, setFilteredBreeds] = useState();
  const [search, setSearch] = useState("");
  const { loading, error, data = [] } = useFetch(
    "https://dog.ceo/api/breeds/list/all",
    []
  );

  useEffect(() => {
    let breeds = data.message ? Object.entries(data.message) : false;
    setBreeds(breeds);
    // setFilteredBreeds(breeds);
  }, [data]);

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      {breeds && (
        <>
          <Typography variant="h1" gutterBottom>
            Breed List
          </Typography>

          <TextField
            id="standard-basic"
            onChange={(e) => setSearch(e.target.value)}
            label="Search dog by breed"
            value={search}
          />
          <List className={classes.root}>
            {breeds.map(([breed, subBreed]) => (
              <Breed {...{ subBreed, breed, search }} key={breed} />
            ))}
          </List>
        </>
      )}
    </>
  );
};

Home.propTypes = {};

export default Home;
