import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { isInMyTeam } from "helpers/localStorageHelper";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SubBreed = ({ breed, subBreed, search, hasSearch }) => {
  const classes = useStyles();

  const sbreed = hasSearch
    ? subBreed
    : subBreed.filter((sb) => (search !== "" ? sb.includes(search) : true));
  return (
    <List component="div">
      {sbreed.map((sb) => (
        <ListItem key={`${breed}-${sb}`} className={classes.nested}>
          <Link
            to={`/detail/${breed}-${sb}`}
            data-dog={`${breed}-${sb}`}
            data-test="dog-link"
          >
            <ListItemText
              primary={sb}
              secondary={isInMyTeam(breed, sb) ? "In my team" : ""}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

SubBreed.propTypes = {
  breed: PropTypes.string,
  subBreed: PropTypes.array,
  search: PropTypes.string,
  hasSearch: PropTypes.bool,
};

export default SubBreed;
