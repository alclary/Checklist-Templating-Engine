import { db } from "../functions/db";

export default class Template {
    constructor(templateName) {
        // required
        this.templateName = templateName;
        // metadata
        this.dateCreated = Date.now();
        this.lastModified = undefined;
        // initialized to defaults
        this.templateTags = [templateName];
        this.schema = {};
    }

    save() {
        return db.templates.put(this);
    }
}

db.templates.mapToClass(Template);
