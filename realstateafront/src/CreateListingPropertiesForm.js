import React from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
const styles = theme => ({
  addButton: { marginBottom: "3px", marginLeft: "10px" },
  roomName: {
    width: "92%",
    marginRight: "2.0%",
    marginLeft: "4.1%",
    marginBottom: `${theme.spacing(2)}px`
  },
  buttonIcon: {
    height: "50px"
  },
  roomProperties: {
    width: "80%",
    marginRight: "2.0%",
    marginLeft: "4.1%",
    marginBottom: `${theme.spacing(2)}px`
  },
  propertiesBox: {
    display: "flex",
    alignItems: "center"
  },
  propertyIdentifier: {
    marginRight: `${theme.spacing(2)}px`,
    marginBottom: `${theme.spacing(2)}px`
  },
  deleteIcon: {
    height: "50px"
  }
});
const CreateListingPropertiesForm = ({
  classes,
  subProperties,
  deleteProperty,
  id,
  addSubProperties,
  Name,
  updatePropetyName,
  updateSubProperty
}) => {
  var proprties = [];
  for (let index = 0; index < subProperties.length; index++) {
    proprties.push(
        <div className={classes.propertiesBox} key = {subProperties[index].id}>
          <FiberManualRecordIcon className={classes.propertyIdentifier} />
          <TextField
            className={classes.roomProperties}
            required
            variant="outlined"
            label="Property Value"
            style={{ marginLeft: "0px" }}
            value = {subProperties[index].propertyValue}
            onChange = {e =>updateSubProperty(subProperties[index].id, e.target.value)}
          />

          <Button onClick={() => deleteProperty(subProperties[index].id)}>
            <DeleteForeverIcon
              fontSize="large"
              className={classes.deleteIcon}
              htmlColor="#725b53"
            />
          </Button>
        </div>
    );
  }
  return (
    <>
      <TextField
        className={classes.roomName}
        required
        variant="outlined"
        label="Property Name"
        style={{ marginLeft: "0px" }}
        value = {Name}
        onChange = {(e) => updatePropetyName(id,e.target.value)}
      />
      <Button className={classes.buttonIcon} onClick = {() => addSubProperties(id)}>
        <AddIcon />
      </Button>
      {proprties}
    </>
  );
};

export default withStyles(styles)(CreateListingPropertiesForm);
