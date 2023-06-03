import Dexie from "dexie";
import TemplateClass from "../classes/TemplateClass";
import RecordClass from "../classes/RecordClass";

export const db = new Dexie("testingDatabase");
db.version(1).stores({
  records: "++id, &recordId, recordType, *tags",
  templates: "++id, name, *tags",
});

db.templates.mapToClass(TemplateClass);
db.records.mapToClass(RecordClass);
