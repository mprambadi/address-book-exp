import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import {
  withStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Contacts from "@material-ui/icons/Contacts";


const styles = () => ({
  root: {
    maxWidth: 500,
    flex: 1
  }
});

class IconLabelTabs extends React.Component {
  render() {
    const { classes, tab, handleChange } = this.props;

    return (
        <Paper square className={classes.root}>
          <Tabs
            value={tab}
            onChange={handleChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab icon={<Contacts />} label="PHONE BOOK"/>
            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
            <Tab icon={<PhoneIcon />} label="ADD CONTACT" />
          </Tabs>

          {this.props.children}
        </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelTabs);
