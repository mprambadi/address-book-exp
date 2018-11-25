import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Back from "@material-ui/icons/ArrowBack";
import Edit from "@material-ui/icons/Edit";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: 345,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  media: {
    height: 140
  },
  container: {
    display: "flex",
    justifyContent: "center"
  },
  column: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  buttonBack: {
    marginLeft: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2
  },
  item: {
    maxWidth: 345
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

function UserDetail(props) {
  const {
    classes,
    handleDetail,
    handleUpdateUser,
    detail: {
      user: { image_url, name, phone, address },
      status,
      edit,
      user
    }
  } = props;

  const handleSave = () => {
    handleUpdateUser();
    handleDetail({ edit: !edit });
  };
  
  return (
    <div>
      <Back
        onClick={() => handleDetail({ status: !status })}
        className={classes.buttonBack}
      />
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image_url}
              title={name}
            />
          </CardActionArea>
          <CardContent>
            <Edit onClick={() => handleDetail({ edit: !edit })} />
            {edit ? (
              <div className={classes.column}>
                <TextField
                  id="outlined-email-input"
                  label="Name"
                  className={classes.textField}
                  type="text"
                  name="name"
                  margin="normal"
                  variant="outlined"
                  defaultValue={name}
                  onChange={e =>
                    handleDetail({ user: { ...user, name: e.target.value } })
                  }
                  autoFocus
                />
                <TextField
                  id="outlined-email-input"
                  label="Phone"
                  className={classes.textField}
                  type="number"
                  name="phone"
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    handleDetail({ user: { ...user, phone: e.target.value } })
                  }
                  defaultValue={phone}
                />
                <TextField
                  id="outlined-email-input"
                  label="Addresss"
                  className={classes.textField}
                  type="text"
                  name="address"
                  margin="normal"
                  variant="outlined"
                  onChange={e =>
                    handleDetail({ user: { ...user, address: e.target.value } })
                  }
                  defaultValue={address}
                />

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className={classes.item}>
                <Typography gutterBottom variant="h5" component="h2">
                  {name} - {phone}
                </Typography>
                <Typography component="p">{address}</Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

UserDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserDetail);
