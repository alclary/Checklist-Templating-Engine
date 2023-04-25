import { db } from "../functions/db";

export default class RecordClass {
  constructor(recordId, recordType) {
    // required
    this.recordId = recordId;
    this.recordType = recordType;
    // metadata
    this.dateCreated = Date.now();
    this.lastModified = undefined;
    // initialized to defaults
    this.tags = "";
    // ReactJSONSchemaForm - Schema
    this.schema = {
      type: "object",
      properties: {
        sections: {
          type: "array",
          title: "Sections",
          items: {
            type: "object",
            properties: {
              check1: {
                type: "boolean",
                title: "Requirement 1 met?",
              },
              check2: {
                type: "boolean",
                title: "Requirement 2 met?",
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
          check1: false,
          check2: false,
        },
        {
          check1: false,
          check2: false,
        },
      ],
    };
  }
}

db.records.mapToClass(RecordClass);
