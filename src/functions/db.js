import Dexie from "dexie";

export const db = new Dexie("appDatabase");
db.version(1).stores({
    records: "&id, totalAge, *tags",
    templates: "++id, name, *tags",
});
