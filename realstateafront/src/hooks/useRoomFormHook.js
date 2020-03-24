import { useState } from "react";

const useRoomFormHook = initialValue => {
  const [BedRoom, setBedroom] = useState([initialValue]);
  const updateRoomProps = (e, key, id) => {
    let updatedProp = BedRoom.map(b => {
      if (b.id === id) {
        let newProp = b;
        newProp[key] = e.target.value;
        return newProp;
      }
      return b;
    });
    setBedroom(updatedProp);
  };
  const addNewRoom = value => {
    setBedroom([...BedRoom, value]);
  };
  const removeRoom = id => {
    const updatedRoom = BedRoom.filter(x => x.id !== id);
    setBedroom(updatedRoom);
  };
  return [BedRoom, updateRoomProps, addNewRoom, removeRoom];
};

export default useRoomFormHook;
