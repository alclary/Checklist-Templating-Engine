import { db } from "../functions/db";
import moment from "moment";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

function TemplateMetadataForm({ template, setTemplate }) {
  const navigate = useNavigate();

  // Tag dropdown options, stored in state
  const [tagOptions, setTagOptions] = useState([]);

  // On first render, get all unique template tags to load as dropdown options
  useEffect(() => {
    db.templates.orderBy("tags").uniqueKeys((tagArray) => {
      setTagOptions(tagArray);
    });
  }, []);

  // On submit, update lastModified field and save template to db
  function handleSubmit(e) {
    e.preventDefault();
    setTemplate({ ...template, lastModified: Date.now() });
    db.templates.put(template);
  }

  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to DELETE template ${template.id}? `
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
              value={template.name}
              onChange={(e) => {
                setTemplate({ ...template, name: e.target.value });
                console.log(template);
              }}
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-id-input">Template ID</label>
            <input
              type="text"
              id="multi-id-input"
              value={template.id}
              readOnly
            ></input>
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label htmlFor="multi-color-input">Template Color</label>
            <input
              type="color"
              id="multi-color-input"
              value={template.color}
              onChange={(e) => {
                setTemplate({ ...template, color: e.target.value });
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
              readOnly
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-last-modified">Last Modified</label>
            <input
              type="date"
              id="multi-last-modified"
              value={moment(template.lastModified).format("YYYY-MM-DD")}
              readOnly
            ></input>
          </div>
        </div>
        <div className="one field">
          <div className="field">
            <label htmlFor="multi-tags">
              Template Tags (Note: children will inherit)
            </label>
            <Dropdown
              options={tagOptions.map((tag) => ({
                key: tag,
                text: tag,
                value: tag,
              }))}
              placeholder="Select Tags"
              search
              selection
              fluid
              multiple
              allowAdditions
              value={template.tags}
              // If changed value in tagOptions, do nothing; else, add.
              onAddItem={(e, { value }) => {
                if (tagOptions.includes(value)) {
                  return;
                } else {
                  setTagOptions([...tagOptions, value]);
                }
              }}
              // Handle updating templateTags state
              onChange={(e, { value }) => {
                setTemplate({ ...template, tags: value });
              }}
            />
          </div>
        </div>

        <button type="submit" className="ui right floated button">
          Submit
        </button>
        <button
          type="button"
          className="ui right floated inverted red button"
          onClick={handleDelete}
        >
          Delete
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
