import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import { Link } from "react-router-dom";
import toPairs from "lodash/toPairs";
import groupBy from "lodash/groupBy";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';

var dogsMap = new Map();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [breeds, setBreeds] = useState();
  const [filteredBreeds, setFilteredBreeds] = useState();
  const { loading, error, data = [] } = useFetch(
    "https://dog.ceo/api/breeds/list/all",
    []
  );

  useEffect(() => {
    let breeds = data.message ? toPairs(data.message) : false;

    if (breeds) {
      breeds.map(([breed, subBreed]) => {
        subBreed.length > 0
          ? subBreed.map((sb) => {
              dogsMap.set(`${breed}-${sb}`, { breed, sb });
            })
          : dogsMap.set(`${breed}`, { breed });
      });
    }

    setBreeds(breeds);
    setFilteredBreeds(breeds);
  }, [data]);

  const filterDogs = (e) => {
    const search = e.target.value;
    if (search !== "") {
      const filteredMap = [];
      for (var [clave, valor] of dogsMap.entries()) {
        if (clave.includes(search)) {
          filteredMap.push(valor);
        }
      }
      const groupFiltered = groupBy(filteredMap, "breed");
      const arranged = {};
      for (const property in groupFiltered) {
        arranged[property] = groupFiltered[property]
          .reduce((acc, curr) => acc.concat([curr.sb]), [])
          .filter((sb) => sb);
      }
      const pairedGroup = toPairs(arranged);
      setFilteredBreeds(pairedGroup);
    } else {
      setFilteredBreeds(breeds);
    }
  };

  const getLink = (subBreed, breed) =>
    subBreed.length > 0 ? (
      breed
    ) : (
      <Link to={`/detail/${breed}`} data-test="dog-link" data-dog={`${breed}`}>
        {breed}
      </Link>
    );

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      {filteredBreeds && (
        <div>
          <TextField id="standard-basic" onChange={filterDogs} label="Search dog by breed" />

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            {filteredBreeds.map(([breed, subBreed]) => (
              <>
                <ListItem button>
                  <ListItemText primary={getLink(subBreed, breed)} />
                </ListItem>
                {subBreed.length > 0 && (
                  <List component="div" disablePadding>
                    {subBreed.map((sb, i) => (
                      <ListItem button className={classes.nested}>
                        <ListItemText
                          primary={
                            <Link
                              to={`/detail/${breed}-${sb}`}
                              data-dog={`${breed}-${sb}`}
                              data-test="dog-link"
                            >
                              {sb}
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

Home.propTypes = {};

export default Home;
