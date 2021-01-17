import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SubBreed from "components/SubBreed";
import {isInMyTeam} from 'helpers/localStorageHelper'

const Breed = ({ breed, subBreed, search }) => {
  const hasChildren = subBreed.length > 0;
  const hasSearch = breed.includes(search);
  const childrenHasSearch =
    search !== ""
      ? subBreed.filter((sb) => sb.includes(search)).length > 0
      : true;

  const breedText = hasChildren ? (
    <span>{breed}</span>
  ) : (
    <Link to={`/detail/${breed}`} data-test="dog-link" data-dog={`${breed}`}>
      {breed}
    </Link>
  );

   return hasSearch || childrenHasSearch ? (
    <>
      <ListItem>
        <ListItemText primary={breedText} secondary={isInMyTeam(breed)? 'In my team': ''}/>
      </ListItem>
      {(hasChildren || hasSearch )&& <SubBreed {...{ subBreed, breed, search, hasSearch }} />}
    </>
  ) : null;
};

Breed.propTypes = {
  breed: PropTypes.string,
  search: PropTypes.string,
  hasChildren: PropTypes.bool,
};

export default Breed;
