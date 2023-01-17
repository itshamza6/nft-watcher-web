import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column font-jura"
      style={{ minHeight: "80vh" }}
    >
      {/* <h1 className="m-0" style={{ fontSize: "40vh" }}>
        404
      </h1> */}
      <h1 className="m-0 font-jura" style={{ fontSize: "30vh" }}>
        Oops!
      </h1>
      <h4 className="font-jura">404 - PAGE NOT FOUND</h4>
      <h4 className="text-center font-jura">
        The Page you'r looking for might have been removed had its name changed
        <br />
        or is temporarily unavailable.
      </h4>
      <Button
        variant="contained"
        color="primary"
        className="font-jura"
        component={Link}
        to="/"
        style={{ borderRadius: 60, padding: "10px 50px" }}
      >
        GO TO HOMEPAGE
      </Button>
    </div>
  );
};

export default PageNotFound;
