// import { useState } from "react";
import { db } from "../functions/db";
import moment from "moment";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

function TemplateMetadataForm({ template, setTemplate }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    template.lastModified = Date.now();
    db.templates.put(template);
    console.log("Template saved!");
  }
  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to DELETE the record for customer ${template.id}? `
      ) === true
    ) {
      db.templates.delete(template.id);
    }
    navigate("/templates");
  }

  return (
    <div className="templateMeta ui clearing segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="ui dividing header">Template Details</div>
        <div className="two fields">
          <div className="field">
            <label htmlFor="multi-name-input">Template Name</label>
            <input
              type="text"
              id="multi-name-input"
              value={template.templateName}
              onChange={(e) => {
                setTemplate({ ...template, templateName: e.target.value });
                console.log(template);
              }}
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-id-input">Template ID</label>
            <input type="text" id="multi-id-input" value={template.id}></input>
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label htmlFor="multi-color-input">Template Color</label>
            <input
              type="color"
              id="multi-color-input"
              value={template.templateColor}
              onChange={(e) => {
                setTemplate({ ...template, templateColor: e.target.value });
                console.log(template);
              }}
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-date-created">Date Created</label>
            <input
              type="date"
              id="multi-date-created"
              value={moment(template.dateCreated).format("YYYY-MM-DD")}
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-last-modified">Last Modified</label>
            <input
              type="date"
              id="multi-last-modified"
              value={moment(template.lastModified).format("YYYY-MM-DD")}
            ></input>
          </div>
        </div>
        <button
          type="button"
          className="ui right floated inverted red button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="submit" className="ui right floated button">
          Submit
        </button>
      </form>
    </div>
  );
}

TemplateMetadataForm.propTypes = {
  template: PropTypes.object,
  setTemplate: PropTypes.func,
};

export default TemplateMetadataForm;
