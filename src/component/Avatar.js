import React from "react";
import { prod } from "../api";
import { Fade } from "@material-ui/core";
export default function Avatar({ user, classes }) {
  return (
    <Fade in>
      <img
        alt={user.filename}
        src={`${prod}/uploads/${user.filename}`}
        className={classes.avatar}
      />
    </Fade>
  );
}
