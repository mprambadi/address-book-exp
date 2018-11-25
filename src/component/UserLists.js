import React, { Suspense, lazy } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Fade,
  Button
} from "@material-ui/core";
import MyLoader from "./Loader";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

// import Avatar from "./Avatar";
// const ListItem = React.lazy(() => import("@material-ui/core/ListItem"));

const Avatar = lazy(() => import("./Avatar"));
const UserList = ({
  users,
  classes,
  loading,
  loadingMore,
  addStar,
  handleDetail,
  detail,
  handleDelete
}) => (
  <List dense>
    {loading
      ? Array.from(Array(7).keys()).map((loader, id) => (
          <MyLoader className={classes.loader} key={loader} />
        ))
      : users.data.map((user, idx) => (
          <ListItem
            key={user.id}
            button
            className={classes.content}
            onClick={() => handleDetail({ user, status: !detail.status })}
          >
            <span> {idx + 1} </span>
            <Suspense
              fallback={
                <Fade in>
                  <AccountCircleRounded className={classes.avatarItem} />
                </Fade>
              }
            >
              <Avatar classes={classes} user={user} />
            </Suspense>
            <Fade in>
              <ListItemText primary={user.name} className={classes.lisetText} />
            </Fade>
            <ListItemSecondaryAction>
              {user.favorite ? (
                <Button>
                  <Star
                    onClick={() =>
                      addStar({ ...user, favorite: !user.favorite })
                    }
                  />
                </Button>
              ) : (
                <Button>
                  <StarBorder
                    onClick={() =>
                      addStar({ ...user, favorite: !user.favorite })
                    }
                  />
                </Button>
              )}
              <Button color="secondary" onClick={()=>handleDelete(user.id)}>Delete</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}

    {loadingMore &&
      Array.from(Array(1).keys()).map((loader, id) => (
        <MyLoader className={classes.loader} key={loader} />
      ))}
  </List>
);

const style = theme => ({
  content: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },

  lisetText: {
    textTransform: "capitalize",
    fontSize: 18
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50
  },

  loader: {
    marginTop: 10,
    marginLeft: theme.spacing.unit * 2
  },
  avatarItem: {
    width: 80,
    height: 80
  }
});
export default withStyles(style)(UserList);
