import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const HeaderDetail = ({ breed, subBreed }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {breed}
      </Typography>
      {subBreed && (
        <Typography variant="h5" gutterBottom>
          {subBreed}
        </Typography>
      )}
    </>
  );
};

HeaderDetail.propTypes = {
  breed: PropTypes.string,
  subBreed: PropTypes.string,
};

export default HeaderDetail;
