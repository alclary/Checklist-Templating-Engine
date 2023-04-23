import { db } from "../functions/db";

export default class TemplateClass {
  constructor(templateName) {
    // required
    this.templateName = templateName;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = undefined;
    // initialized to defaults
    this.templateColor = "#fff";
    this.templateTags = [templateName];
    this.schema = {
      type: "object",
      required: [],
      properties: {
        sampleCheck1: {
          type: "boolean",
          title: "Sample Checkbox 1",
          default: false,
        },
        sampleCheck2: {
          type: "boolean",
          title: "Sample Checkbox 2",
          default: false,
        },
      },
    };
  }
}

db.templates.mapToClass(TemplateClass);
