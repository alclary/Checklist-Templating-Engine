import { db } from "../functions/db";
import moment from "moment";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

function RecordMetadataForm({ record, setRecord }) {
  const navigate = useNavigate();

  // tag dropdown options, stored in state
  const [tagOptions, setTagOptions] = useState([]);

  // On first render, get all unique record tags, to load into dropdown
  useEffect(() => {
    db.records.orderBy("tags").uniqueKeys((tagArray) => {
      setTagOptions(tagArray);
    });
  }, []);

  // On submit, update lastModified field and save record to db
  function handleSubmit(e) {
    e.preventDefault();
    setRecord({ ...record, lastModified: Date.now() });
    db.records.put(record);
  }
  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to DELETE record ${record.name}? `
      ) === true
    ) {
      db.records.delete(record.id);
    }
    navigate("/records");
  }

  return (
    <div className="templateMeta ui clearing segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="ui dividing header">{record.name} - Record Details</div>
        <div className="two fields">
          <div className="field">
            <label htmlFor="multi-id-input">Record ID</label>
            <input
              type="text"
              id="multi-id-input"
              value={record.name}
              onChange={(e) => {
                setRecord({ ...record, name: e.target.value });
              }}
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-type-input">Record Type (Template ID)</label>
            <input
              type="text"
              id="multi-type-input"
              value={record.recordType}
              readOnly
            ></input>
          </div>
        </div>
        <div className="two fields">
          <div className="field disabled">
            <label htmlFor="multi-date-created">Date Created</label>
            <input
              type="date"
              id="multi-date-created"
              value={moment(record.dateCreated).format("YYYY-MM-DD")}
              readOnly
            ></input>
          </div>
          <div className="field disabled">
            <label htmlFor="multi-last-modified">Last Modified</label>
            <input
              type="date"
              id="multi-last-modified"
              value={moment(record.lastModified).format("YYYY-MM-DD")}
              readOnly
            ></input>
          </div>
        </div>
        <div className="one field">
          <div className="field">
            <label htmlFor="multi-tags">Record Tags</label>
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
              value={record.tags}
              // Handle adding new dropdown option for allowAdditions tags
              onAddItem={(e, { value }) => {
                if (tagOptions.includes(value)) {
                  return;
                } else {
                  setTagOptions([...tagOptions, value]);
                }
              }}
              // Handle updating recordTags state
              onChange={(e, { value }) => {
                setRecord({ ...record, tags: value });
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

RecordMetadataForm.propTypes = {
  record: PropTypes.object,
  setRecord: PropTypes.func,
};

export default RecordMetadataForm;
