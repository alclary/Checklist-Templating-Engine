import Dexie from "dexie";

export const db = new Dexie("testingDatabase");
db.version(1).stores({
  records: "++id, &recordId, recordType, *tags",
  templates: "++id, name, *tags",
});
