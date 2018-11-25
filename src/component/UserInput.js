import React from "react";
import { withFormik, ErrorMessage, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Avatar } from "@material-ui/core";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";

import * as yup from "yup";
import api from "../api";

const UserInput = props => {
  const { classes, handleChange, values } = props;

  return (
    <div className={classes.userInput}>
      <div className={classes.avatarContainer}>
        {values.file ? (
          <Avatar
            src={URL.createObjectURL(values.file)}
            className={classes.avatarItem}
          />
        ) : (
          <AccountCircleRounded className={classes.avatarItem} />
        )}
      </div>
      <Form className={classes.userInputItem}>
        <input
          id="outlined-button-file"
          accept="image/*"
          className={classes.input}
          type="file"
          name="file"
          onChange={({ target: { files } }) =>
            props.setFieldValue("file", files[0])
          }
        />
        <label htmlFor="outlined-button-file">
          <Button
            variant="outlined"
            component="span"
            className={classes.upload}
          >
            Choose Profile Picture
          </Button>
        </label>
        <TextField
          id="outlined-nama-input"
          label="Nama"
          className={classes.textField}
          type="text"
          name="nama"
          margin="normal"
          variant="outlined"
          value={values.nama}
          onChange={handleChange}
        />
        <ErrorMessage name="nama" component="div" />
        <TextField
          id="outlined-phone-input"
          label="Phone"
          className={classes.textField}
          type="number"
          name="phone"
          margin="normal"
          variant="outlined"
          value={values.phone}
          onChange={handleChange}
        />
        <ErrorMessage name="phone" component="div" />
        <TextField
          id="outlined-address-input"
          label="Address"
          className={classes.textField}
          type="text"
          name="address"
          margin="normal"
          variant="outlined"
          value={values.address}
          onChange={handleChange}
        />
        <ErrorMessage name="address" component="div" />

        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const validationSchema = yup.object().shape({
  nama: yup.string().min(3),
  phone: yup.number().min(6),
  address: yup.string().min(5)
});

const formikEnhancer = withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    nama: "",
    phone: "",
    address: "",
    file: ""
  }),
  handleSubmit: async (values, { props, setFieldValue }) => {
    const item = new FormData();

    item.append("photo", values.file);
    item.append("phone", values.phone);
    item.append("name", values.nama);
    item.append("address", values.address);

    const { data } = await api.post("/users", item);

    setFieldValue("file", "");
    setFieldValue("phone", "");
    setFieldValue("nama", "");
    setFieldValue("address", "");
    props.addUser(data);
  }
})(UserInput);

const style = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  userInput: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  userInputItem: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing.unit
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit
  },
  avatarItem: {
    width: 100,
    height: 100
  },
  input: {
    display: "none"
  },
  upload: {
    display: "flex",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});
const styleEnhancer = withStyles(style)(formikEnhancer);
export default styleEnhancer;
