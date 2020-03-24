import { useState } from "react";
import uuid from "uuid/v4";

// let v = [{
//     Type : "Exterior",
//     Name : "Name of the Property",
//     id : "uuid",
//     "properties" : [{id : uuid(),propertyValue : ""},""]
// }]

const UseListingPropertiesFormHook = type => {
  const property = [
    {
      Type: type,
      Name: "",
      id: uuid(),
      properties: [{ id: uuid(), propertyValue: "" }]
    }
  ];
  const [properties, setProperties] = useState(property);

  const addNewproperty = type => {
    setProperties([
      ...properties,
      {
        Type: type,
        Name: "",
        id: uuid(),
        properties: [{ id: uuid(), propertyValue: "" }]
      }
    ]);
  };
  const deleteProperty = id => {
    const deletedPropertiesObject = properties.map(x => {
      var p = x.properties.filter(p => p.id !== id);
      x.properties = p;
      return x;
    });

    var newPropertyarray = deletedPropertiesObject.filter(
      x => x.properties.length > 0
    );
    setProperties(newPropertyarray);
  };

  const addSubProperties = id => {
    const newProperties = properties.map(p => {
      if (p.id === id) {
        p.properties.push({ id: uuid(), propertyValue: "" });
        return p;
      }
      return p;
    });
    setProperties(newProperties);
  };
  const updateSubProperty = (id,Value) => {
    const updateProperty = properties.map(x => {
      x.properties.forEach(p => {
        if(p.id == id){
          p.propertyValue = Value
        }
      });
      return x;
    });
    setProperties(updateProperty);
  };
  const updatePropetyName = (id, Value) => {
    const newPropety = properties.map(p => {
      if (p.id === id) {
        p.Name = Value;
      }
      return p;
    });
    setProperties(newPropety);
  };
  return [
    properties,
    addNewproperty,
    deleteProperty,
    addSubProperties,
    updatePropetyName,
    updateSubProperty
  ];
};

export default UseListingPropertiesFormHook;
