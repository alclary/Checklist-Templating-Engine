import { db } from "../functions/db";
import moment from "moment";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

function RecordMetadataForm({ record, setRecord }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setRecord({ ...record, lastModified: Date.now() });
    db.records.put(record);
    console.log("Template saved!");
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
            <label htmlFor="multi-tags">Tags (comma-delimited)</label>
            <input
              type="text"
              id="multi-tags"
              value={record.tags}
              onChange={(e) => {
                setRecord({ ...record, tags: e.target.value });
              }}
            ></input>
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
