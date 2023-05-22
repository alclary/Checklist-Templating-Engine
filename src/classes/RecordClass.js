import { db } from "../functions/db";

export default class RecordClass {
  constructor(recordId, recordType) {
    // required
    this.recordId = recordId;
    // recordType aka template
    this.recordType = recordType;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = undefined;
    // initialized to defaults
    this.tags = "";
    // ReactJSONSchemaForm - Schema
    this.schema = {};
    // ReactJSONSchemaForm - FormData
    this.formData = {};
  }
}

db.records.mapToClass(RecordClass);
