import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorAdd, setColorAdd] = useState(initialColor);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(`Save Edit ${res}`);
        axiosWithAuth()
          .get("/colors")
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(`Save Edit - Error ${err.response}`));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(`Delete Color: ${res}`);
        axiosWithAuth()
          .get("/colors")
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(`Delete Color - Error ${err.response}`));
  };

  const handleNewColor = (e) => {
    setColorAdd({ ...colorAdd, [e.target.name]: e.target.value });
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorAdd)
      .then((res) => {
        updateColors(res.data);
        setColorAdd(initialColor);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}
      {!loadingAdd && (
        <button onClick={() => setLoadingAdd(true)}>Add Colors</button>
      )}
      {loadingAdd && (
        <form onSubmit={colorAdd}>
          <input
            type="color"
            onChange={(e) =>
              setColorAdd({ ...colorAdd, code: { hex: e.target.value } })
            }
            value={colorAdd.color.hex}
            required
          />
          <input
            type="text"
            placeholder="what should this color be called?"
            onChange={(e) => setColorAdd({ ...colorAdd, code: e.target.value })}
            value={addColor.color}
            required
          />
          <button type="submit">add</button>
          <button onClick={() => false}>Done Adding Colors</button>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
