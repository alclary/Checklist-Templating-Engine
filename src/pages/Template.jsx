import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../functions/db";
import validator from "@rjsf/validator-ajv8";
import SchemaForm from "@rjsf/semantic-ui";
import TemplateMetadataForm from "../components/TemplateMetadataForm";

export default function Template() {
  const { templateId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [template, setTemplate] = useState();

  useEffect(() => {
    getTemplate();
  }, []);

  const getTemplate = async () => {
    await db.templates
      .where("id")
      .equals(Number(templateId))
      .first((template) => {
        setTemplate(template);
        console.log(template);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  function handleSubmit() {
    db.templates.put(template);
  }

  const uiSchema = {};

  if (isLoading) {
    return (
      <div className="loading">
        <i className="huge notched circle loading icon"></i>
      </div>
    );
  }
  return (
    <div className="templateWrapper sixteen wide column">
      <TemplateMetadataForm template={template} setTemplate={setTemplate} />
      <SchemaForm
        schema={template.schema}
        validator={validator}
        formData={template.formData}
        uiSchema={uiSchema}
        onChange={(e) => {
          console.log(e);
          setTemplate({ ...template, formData: e.formData });
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <button type="submit">Save Schema</button>
        </div>
      </SchemaForm>
    </div>
  );
}
