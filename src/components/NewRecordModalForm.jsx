import { useState } from "react";
import { PropTypes } from "prop-types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";
import RecordClass from "../classes/RecordClass";
import axios from "axios";

export default function NewRecordModalForm({ setShowRecordCreate }) {
  let [newRecordId, setNewRecordId] = useState("");
  let [newRecordType, setNewRecordType] = useState(undefined);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newRecordType === undefined || newRecordId === "") {
      console.log("SPECIFY TEMPLATE AND UNIQUE ID!");
      return;
    } else {
      const newRecord = new RecordClass(newRecordId, newRecordType);
      await newRecord.init();
      console.log(newRecord);
      await db.records.put(newRecord);
    }
  }

  const templates = useLiveQuery(async () => {
    return await db.templates.toArray();
  });

  return (
    <div className="newRecordModalForm ui clearing segment ten wide column">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="ui dividing header">Create New Record:</div>
        <div className="two fields">
          <div className="field">
            <label htmlFor="multi-id-input">Record ID</label>
            <input
              type="text"
              id="multi-id-input"
              value={newRecordId}
              onChange={(e) => {
                setNewRecordId(e.target.value);
              }}
            ></input>
          </div>
          <div className="field">
            <label htmlFor="multi-type-input">
              Record Type (i.e. Template Archetype)
            </label>
            <select
              className="ui dropdown"
              name="multi-type-input"
              onChange={(e) => {
                setNewRecordType(e.target.value);
                console.log(newRecordType);
              }}
            >
              <option value={undefined}>Select Template</option>
              {templates?.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.templateName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* TODO implement conditionally shown tags, once template archetype selected*/}
        {/* <div className="one field">
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
        </div> */}

        <button type="submit" className="ui right floated button">
          Create
        </button>
        <button
          type="button"
          className="ui right floated inverted red button"
          onClick={() => {
            setShowRecordCreate(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

NewRecordModalForm.propTypes = {
  setShowRecordCreate: PropTypes.func,
};
