import { db } from "../functions/db";
import axios from "axios";

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
  }

  async init() {
    const parentTemplate = await db.templates.get({ id: this.recordType });
    this.tags = await parentTemplate.templateTags;
    const transformedSchema = await axios.post(
      "http://localhost:8080",
      parentTemplate.formData
    );
    this.schema = JSON.parse(transformedSchema.data);
    return;
  }
}

db.records.mapToClass(RecordClass);
