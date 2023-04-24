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
    // ReactJSONSchemaForm - Schema
    this.schema = {
      type: "object",
      properties: {
        sections: {
          type: "array",
          title: "Template Body",
          items: {
            type: "object",
            required: ["sectionTitle"],
            properties: {
              sectionTitle: {
                type: "string",
                title: "Section Title",
              },
              sectionDescription: {
                type: "string",
                title: "Section Description",
              },
              checkItems: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    checkboxDesc: {
                      type: "string",
                      title: "Checkbox Description",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    // ReactJSONSchemaForm - FormData
    this.formData = {
      sections: [
        {
          checkItems: [],
        },
      ],
    };
  }
}

db.templates.mapToClass(TemplateClass);
