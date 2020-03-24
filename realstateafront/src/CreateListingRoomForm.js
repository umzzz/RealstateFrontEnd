import React from "react";
import { TextField, Button, withStyles } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const style = theme => ({
  roomProperties: {
    width: "43%",
    marginRight: "2.0%",
    marginLeft: "4.1%",
    marginBottom: `${theme.spacing(2)}px`
  },
  deleteIcon: {
    height: "50px"
  },
  addButton: { marginBottom: "3px", marginLeft: "10px" }
});

const CreateListingRoomForm = ({
  classes,
  deleteEntry,
  roomProps,
  update,
  addNewBedRoomProp,
  Name,
  display
}) => {
  return (
    <div>
      <TextField
        className={classes.roomProperties}
        required
        variant="outlined"
        label="Room Name"
        style={{ marginLeft: "0px" }}
        value={roomProps.Name}
        onChange={e => {
          update(e, "Name", roomProps.id);
        }}
      />
      <TextField
        className={classes.roomProperties}
        required
        variant="outlined"
        label="Room Size"
        value={roomProps.Size}
        onChange={e => {
          update(e, "Size", roomProps.id);
        }}
      />
      <Button onClick={() => deleteEntry(roomProps.id)}>
        <DeleteForeverIcon
          fontSize="large"
          className={classes.deleteIcon}
          htmlColor="#725b53"
        />
      </Button>
      {display && (
        <Button
          variant="contained"
          style={{ backgroundColor: "#3A454D" ,color:"#b9b9b9"}}
          fullWidth
          onClick={addNewBedRoomProp}
        >
          {Name}
          <AddBoxIcon className={classes.addButton} />
        </Button>
      )}
    </div>
  );
};

export default withStyles(style)(CreateListingRoomForm);
