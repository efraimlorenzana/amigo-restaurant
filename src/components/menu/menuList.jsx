import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");

const MenuList = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (menu === null) reloadMenu();
  }, [menu]);

  const reloadMenu = () => ipcRenderer.send("get-menu", "menu.json");

  ipcRenderer.on("post-menu", (e, payload) => setMenu(payload.menu));

  if (menu === null) return <h1>Loading menu...</h1>;
  console.log(menu);
  return (
    <div>
      <h2>Menu List</h2>
      {menu.length > 0 && (
        <ul>
          {menu.map((m) => (
            <li key={m.id}>
              <span>{m.title}</span>
              <strong>{m.price}</strong>
            </li>
          ))}
        </ul>
      )}

      {!menu.length && <div>No available menu</div>}
    </div>
  );
};

export default MenuList;
