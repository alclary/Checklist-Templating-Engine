import { db } from "../functions/db";
// import axios from "axios";

export default class RecordClass {
  constructor(recordId, recordType) {
    // required
    this.recordId = recordId;
    // recordType aka template
    this.recordType = parseInt(recordType);
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = Date.now();
    // defaults
    this.formData = {};
    this.schema = undefined;
  }

  async init() {
    // fetch parent template (archetype) from indexeDB
    const parentTemplate = await db.templates.get({ id: this.recordType });
    this.tags = await parentTemplate.tags;
    this.color = await parentTemplate.color;

    // socket setup for JSON schema transformation (Replace w/ local function)
    let socket = new WebSocket("ws://localhost:5557");
    socket.onopen = () => {
      // send parent JSON schema to be transformed for use in record (child)
      socket.send(JSON.stringify(parentTemplate.formData));
    };
    socket.onmessage = (event) => {
      // server response of stringified transformed JSON, parse and set schema
      this.schema = JSON.parse(event.data);
      this.save();
      // graceful socket close as success
      socket.close(1000, "Complete");
      return;
    };

    // if above socket operations do not close within 3 seconds, force return
    setTimeout(() => {}, 3000);
    return;
  }

  async save() {
    this.lastModified = Date.now();
    await db.records.put(this);
    console.log("Record saved.");
  }
}
