import { useState } from "react";
import { PropTypes } from "prop-types";
import TemplateClass from "../classes/TemplateClass";

export default function NewTemplateModalForm({ setShowTemplateCreate }) {
  let [newTemplateName, setNewTemplateName] = useState("");
  let [newTemplateColor, setNewTemplateColor] = useState("#FFF");

  async function handleSubmit(e) {
    e.preventDefault();
    if (newTemplateName === "") {
      console.log("SPECIFY TEMPLATE NAME!");
      return;
    } else {
      const newTemplate = new TemplateClass(newTemplateName, newTemplateColor);
      await newTemplate.save();
      // close modal form
      setShowTemplateCreate(false);
    }
  }

  return (
    <div className="modalForm ui clearing segment ten wide column">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="ui dividing header">Create New Template</div>
        <div className="two fields">
          <div className="field">
            <label htmlFor="multi-id-input">Template Name</label>
            <input
              type="text"
              id="multi-id-input"
              value={newTemplateName}
              onChange={(e) => {
                setNewTemplateName(e.target.value);
              }}
            ></input>
          </div>
          <div className="field">
            <label htmlFor="multi-color-input">Template Color</label>
            <input
              type="color"
              id="multi-color-input"
              value={newTemplateColor}
              onChange={(e) => {
                setNewTemplateColor(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <button type="submit" className="ui right floated button">
          Create
        </button>
        <button
          type="button"
          className="ui right floated inverted red button"
          onClick={() => {
            // close modal form
            setShowTemplateCreate(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

NewTemplateModalForm.propTypes = {
  setShowTemplateCreate: PropTypes.func,
};
