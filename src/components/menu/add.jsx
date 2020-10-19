import React, { Fragment, useState } from "react";
const { ipcRenderer } = window.require("electron");

const AddMenu = () => {

  const [fields, setFields] = useState({});

  const closeWindow = () => {
    window.close();
  };

  const addNewMenu = (e) => {
    e.preventDefault();

    ipcRenderer.send("add-menu", `{
        "meal": "${fields.meal}",
        "price": "${fields.price}"
    }`);

    //closeWindow();
  }

  ipcRenderer.on("add-menu:status", (e, payload) => {
    const myNotification = new Notification('New meal available', payload);

    myNotification.onclick = () => {
        closeWindow();
    }
  });

  const handleFields = (event) => {
    setFields({ ...fields, [event.target.name] : event.target.value });
  }

  return (
    <Fragment>
      <form onSubmit={addNewMenu}>
        <div>
          <label for="txtTitle">Enter Meal:</label>
          <input id="txtTitle" name="meal" type="text" onChange={handleFields} />
        </div>

        <div>
          <label for="txtPrice">Enter Price:</label>
          <input id="txtPrice" name="price" type="text" onChange={handleFields} />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={closeWindow}>Close</button>
    </Fragment>
  );
};

export default AddMenu;
