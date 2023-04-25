// Example Template 1 Schema
const schema = {
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
// Example Template 1 Data Empty
const formData = {
  sections: [
    {
      checkItems: [],
    },
  ],
};
// Example Template 1 Data
{
  "sections": [
    {
      "checkItems": [
        {
          "checkboxDesc": "Checkbox requirement 1.1"
        },
        {
          "checkboxDesc": "Checkbox requirement 1.2"
        }
      ],
      "sectionTitle": "Section 1 Title ",
      "sectionDescription": "Section 1 Desc"
    },
    {
      "checkItems": [
        {
          "checkboxDesc": "Checkbox requirement 2.1"
        }
      ],
      "sectionTitle": "Section 2 Title",
      "sectionDescription": "Section 2 Desc"
    }
  ]
}

console.log(JSON.stringify(schema));
console.log("\n");
console.log(JSON.stringify(formData));
