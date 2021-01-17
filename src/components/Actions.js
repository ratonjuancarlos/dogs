import React, {  useReducer } from "react";
import PropTypes from "prop-types";
import { saveDog } from "helpers/localStorageHelper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Snack from "components/Snack";
import { calculateState, reducer } from "helpers/actionsHelper";

const useStyles = makeStyles((theme) => ({
  actions: {
    margin: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  googleLink: {
    margin: "15px 0",
  },
}));

const Actions = ({ breed, subBreed, image }) => {
  const [state, dispatch] = useReducer(reducer, { breed, subBreed }, calculateState);
  const { buttonMessage, message, isEnabled, inMyTeam } = state;
  let history = useHistory();
  const classes = useStyles();
  const save = () => {
    if(saveDog(breed, subBreed, image)){
        dispatch({ type: "save", payload: { breed, subBreed } });
    }
  };

  const googleLink = subBreed ? `${breed}+${subBreed}` : `${breed}`;

  return (
    <div className={classes.actions}>
      <Button
        data-test="save-dog"
        onClick={save}
        disabled={!isEnabled}
        variant="contained"
        color="primary"
      >
        {buttonMessage}
      </Button>
      {inMyTeam && (
        <Button
          data-test="see-dog"
          onClick={() => history.push(`/my-team`)}
          variant="contained"
          color="secondary"
        >
          Go to your team to see this dog
        </Button>
      )}

      <Typography
        variant="overline"
        gutterBottom
        className={classes.googleLink}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/search?q=${googleLink}`}
        >
          See on google
        </a>
      </Typography>
      <Snack message={message} open={message!==""} />
    </div>
  );
};

Actions.propTypes = {
  breed: PropTypes.string,
  subBreed: PropTypes.string,
  image: PropTypes.string,
};

export default Actions;
