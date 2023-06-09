import { db } from "../functions/db";

export default class TemplateClass {
  constructor(templateName, templateHexColor) {
    // required
    this.name = templateName;
    this.color = templateHexColor;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = Date.now();
    // initialized to defaults
    this.tags = [templateName];
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
                title: "New section title:",
              },
              sectionDescription: {
                type: "string",
                title: "New section description:",
              },
              checkItems: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    checkboxText: {
                      type: "string",
                      title: "Checkbox text:",
                    },
                    checkboxDescription: {
                      type: "string",
                      title:
                        "(Optional) information or instructions for checkbox:",
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
          checkItems: [
            {
              checkboxText: "checkbox1.1_text",
              checkboxDescription: "checkbox1.1_desc_optional",
            },
            {
              checkboxText: "checkbox1.2_text",
            },
          ],
          sectionTitle: "section1_title",
          sectionDescription: "section1_desc_optional",
        },
      ],
    };
  }

  async save() {
    this.lastModified = Date.now();
    await db.templates.put(this);
    console.log("Template saved.");
  }
}
