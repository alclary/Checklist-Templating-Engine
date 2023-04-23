import { db } from "../functions/db";

export default class Template {
  constructor(templateName) {
    // required
    this.templateName = templateName;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = undefined;
    // initialized to defaults
    this.templateColor = "#fff";
    this.templateTags = [templateName];
    this.schema = {};
  }

  save() {
    this.lastModified = Date.now();
    db.templates.put(this);
    console.log("Template saved!");
  }

  log() {
    console.log(JSON.stringify(this));
  }
}

db.templates.mapToClass(Template);
