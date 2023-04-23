import moment from "moment/moment";
import { db } from "../functions/db";

export default class RecordClass {
  constructor(id, recordType) {
    // required
    this.id = id;
    this.recordType = recordType;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = undefined;
    // initialized to defaults
    this.tags = [];
  }

  get totalAge() {
    return moment(Date.now().diff(this.dateCreated, "days"));
  }

  get timeSinceLastModified() {
    return (
      this.lastModified && moment(Date.now().diff(this.lastModified, "days"))
    );
  }

  save() {
    this.lastModified = Date.now();
    db.records.put(this);
  }
}

db.records.mapToClass(RecordClass);
