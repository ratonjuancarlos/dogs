import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const EmptyTeam = () => {
  return (
    <Typography variant="h4" gutterBottom>
      No dogs in your team. Go to <Link to="/">Home page</Link> and pick one.
    </Typography>
  );
};

export default EmptyTeam;
