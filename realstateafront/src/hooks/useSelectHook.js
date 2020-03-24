import { useState } from "react";

const UseSelectHook = value => {
  const [input, setinput] = useState(value);

  const updateInput = e => {
    setinput(e.target.value);
  };

  return [input, updateInput];
};

export default UseSelectHook;
