import React, { useState } from "react";
import CreateListingRoomForm from "./CreateListingRoomForm";
import CreateListingPropertiesForm from "./CreateListingPropertiesForm";
import {
  Paper,
  TextField,
  withStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AddBoxIcon from "@material-ui/icons/AddBox";

import useSelectHook from "./hooks/useSelectHook";
import uuid from "uuid/v4";
import userRoomFormHook from "./hooks/useRoomFormHook";
import usePropertiesformHook from "./hooks/useListingPropertiesFormHook";

const styles = theme => ({
  container: {
    margin: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    backgroundColor: "#F4F4F4",
    border: "solid 1px #A6A6A6"
  },
  input: {
    margin: `${theme.spacing(1)}px 0`
  },
  heading: {
    margin: "0.5rem auto",
    justifyContent: "center"
  },
  select: {
    minWidth: `30%`,
    marginLeft: "2.1%",
    marginRight: "2.1%"
  },
  peopertySummarySelect: {
    width: "100%"
  },
  buildYear: {
    minWidth: `30%`,
    marginLeft: "3.5%",
    marginRight: "1.66%",
    marginBottom: "-2px"
  },
  submit: {
    padding: "20px 0"
  },
  submitForm: {
    padding: "40px 0"
  }
});

const CreateListing = props => {
  const { classes } = props;

  const [propertyType, setPropertyType] = useSelectHook("Comerical");
  const [propertySubType, setPropertySubType] = useSelectHook("");
  const [roomProps, updateRoomProps, addRoom, removeRoom] = userRoomFormHook({
    id: uuid(),
    Name: "",
    Size: ""
  });
  const [
    BathroomProps,
    updateBathroomProps,
    addBathRoom,
    removeBathRoom
  ] = userRoomFormHook({
    id: uuid(),
    Name: "",
    Size: ""
  });
  const [
    interiorProps,
    AddInteriorProperty,
    deleteInteriorProperty,
    addInteriorSubProperties,
    updateInteriorPropetyName,
    updateInteriorSubProperty
  ] = usePropertiesformHook("Interior");
  const [
    exteriorProps,
    AddExteriorProperty,
    deleteExteriorProperty,
    addExteriorSubProperties,
    updateExteriorPropetyName,
    updateExteriorSubProperty
  ] = usePropertiesformHook("Exterior");
  const [price, setPrice] = useState("");
  const [address, setaddress] = useState("");
  const [fees, setfees] = useState("");
  const [propertyDescription, setpropertyDescription] = useState("");
  const bedroom = [];
  const BathRoom = [];
  var interior = [];
  var exterior = [];
  const postListing = () => {
    console.log("It was called");
  };
  const addNewBedRoomProp = () => {
    addRoom({
      id: uuid(),
      Name: "",
      Size: ""
    });
  };
  const addNewBathRoomProp = () => {
    addBathRoom({
      id: uuid(),
      Name: "",
      Size: ""
    });
  };

  for (let index = 0; index < roomProps.length; index++) {
    let display = index === roomProps.length - 1 ? true : false;
    bedroom.push(
      <CreateListingRoomForm
        key={index}
        deleteEntry={removeRoom}
        roomProps={roomProps[index]}
        update={updateRoomProps}
        addNewBedRoomProp={addNewBedRoomProp}
        Name="Add BedRoom(s)"
        display={display}
      />
    );
  }
  for (let index = 0; index < BathroomProps.length; index++) {
    let display = index === BathroomProps.length - 1 ? true : false;
    BathRoom.push(
      <CreateListingRoomForm
        key={index}
        deleteEntry={removeBathRoom}
        roomProps={BathroomProps[index]}
        update={updateBathroomProps}
        addNewBedRoomProp={addNewBathRoomProp}
        Name="Add BathRooms(s)"
        display={display}
      />
    );
  }
  // Interior Props
  for (let index = 0; index < interiorProps.length; index++) {
    interior.push(
      <CreateListingPropertiesForm
        key={interiorProps[index].id}
        deleteProperty={deleteInteriorProperty}
        subProperties={interiorProps[index].properties}
        id={interiorProps[index].id}
        addSubProperties={addInteriorSubProperties}
        updatePropetyName={updateInteriorPropetyName}
        Name={interiorProps[index].Name}
        updateSubProperty={updateInteriorSubProperty}
      />
    );
  }
  // Exterior Props
  for (let index = 0; index < exteriorProps.length; index++) {
    exterior.push(
      <CreateListingPropertiesForm
        key={exteriorProps[index].id}
        deleteProperty={deleteExteriorProperty}
        subProperties={exteriorProps[index].properties}
        id={exteriorProps[index].id}
        addSubProperties={addExteriorSubProperties}
        updatePropetyName={updateExteriorPropetyName}
        Name={exteriorProps[index].Name}
        updateSubProperty={updateExteriorSubProperty}
      />
    );
  }
  return (
    <form>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.container}>
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon /> Property Initial Details
          </Typography>
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            label="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            label="Address"
            value={address}
            onChange={e => setaddress(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            fullWidth
            multiline
            rows="4"
            variant="outlined"
            label="Property Description...."
            value={propertyDescription}
            onChange={e => setpropertyDescription(e.target.value)}
          />
          <TextField
            className={classes.input}
            required
            fullWidth
            variant="outlined"
            label="fees"
            value={fees}
            onChange={e => setfees(e.target.value)}
          />
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon />
            Property Summary
          </Typography>
          <div className={classes.peopertySummarySelect}>
            <FormControl
              className={classes.select}
              style={{ marginLeft: "0px" }}
            >
              <InputLabel id="demo-simple-select-label">
                Property Type
              </InputLabel>
              <Select fullWidth value={propertyType} onChange={setPropertyType}>
                <MenuItem value={"Comerical"}>Comerical</MenuItem>
                <MenuItem value={"Residential"}>Residential</MenuItem>
              </Select>
            </FormControl>

            {propertyType === "Comerical" ? (
              <FormControl
                className={classes.select}
                style={{ marginLeft: "0px" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Property Type
                </InputLabel>
                <Select
                  fullWidth
                  value={propertyType}
                  onChange={setPropertyType}
                >
                  <MenuItem value={"Industrial"}>Industrial</MenuItem>
                  <MenuItem value={"WareHouse"}>WareHouse</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">
                  Property Sub Type
                </InputLabel>
                <Select
                  fullWidth
                  value={propertySubType}
                  onChange={setPropertySubType}
                >
                  <MenuItem value={"Industrial"}>House</MenuItem>
                  <MenuItem value={"WareHouse"}>Apartment</MenuItem>
                </Select>
              </FormControl>
            )}

            <TextField
              required
              variant="outlined"
              label="Build Year"
              className={classes.buildYear}
              style={{ marginRight: "0px" }}
            />
          </div>
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon />
            Bedroom Info
          </Typography>
          <div className={classes.submit}>{bedroom}</div>
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon />
            Bathroom Info
          </Typography>
          <div className={classes.submit}>{BathRoom}</div>
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon />
            Interior Properties
          </Typography>
          <div>
            <div className={classes.submit}>
              {interior}
              <Button
                variant="contained"
                style={{ backgroundColor: "#3A454D", color: "#b9b9b9" }}
                fullWidth
                onClick={() => AddInteriorProperty("Interior")}
              >
                Add New Property
                <AddBoxIcon className={classes.addButton} />
              </Button>
            </div>
          </div>
          <Typography gutterBottom variant="h5" className={classes.heading}>
            <ArrowForwardIosIcon />
            Exterior Properties
          </Typography>
          <div>
            <div className={classes.submit}>
              {exterior}
              <Button
                variant="contained"
                style={{ backgroundColor: "#3A454D", color: "#b9b9b9" }}
                fullWidth
                onClick={() => AddExteriorProperty("Exterior")}
              >
                Add New Property
                <AddBoxIcon className={classes.addButton} />
              </Button>
            </div>
          </div>
          <div>
            <div className={classes.submitForm}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#658374" }}
                fullWidth
                onClick={() => postListing()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </form>
  );
};

export default withStyles(styles)(CreateListing);
