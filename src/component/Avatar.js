import React from "react";
import { Fade } from "@material-ui/core";
export default function Avatar({ user, classes }) {
  return (
    <Fade in>
      <img
        alt={user.filename}
        src={user.image_url}
        className={classes.avatar}
      />
    </Fade>
  );
}
