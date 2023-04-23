import { useState } from "react";
import validator from "@rjsf/validator-ajv8";
import SchemaForm from "@rjsf/core";

export default function FormSchemaDisplay() {
  const uiSchema = {
    "ui:classNames": "pure-u-1",
  };

  const schema = {
    type: "object",
    required: [],
    properties: {
      chk1: { type: "boolean", title: "Checkbox item 1", default: false },
      chk2: { type: "boolean", title: "Checkbox item 2", default: false },
      chk3: { type: "boolean", title: "Checkbox item 3", default: false },
    },
  };
  return (
    <>
      <SchemaForm schema={schema} validator={validator} uiSchema={uiSchema} />
    </>
  );
}
