import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../functions/db";
import moment from "moment";
import FormSchemaDisplay from "../components/FormSchemaDisplay";

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

  function handleSubmit(e) {
    e.preventDefault();
    template.lastModified = Date.now();
    db.templates.put(template);
    console.log("Template saved!");
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <legend>Template Builder</legend>
          <div className="pure-g">
            <div className="pure-u-1-2">
              <label htmlFor="multi-name-input">Template Name</label>
              <input
                type="text"
                id="multi-name-input"
                className="pure-u-2-3"
                value={template.templateName}
                onChange={(e) => {
                  setTemplate({ ...template, templateName: e.target.value });
                  console.log(template);
                }}
              ></input>
            </div>
            <div className="pure-u-1-2">
              <label htmlFor="multi-color-input">Template Color</label>
              <input
                type="color"
                id="multi-color-input"
                className="pure-u-1-3"
                value={template.templateColor}
                onChange={(e) => {
                  setTemplate({ ...template, templateColor: e.target.value });
                  console.log(template);
                }}
              ></input>
            </div>
            <div className="pure-u-1-2">
              <label htmlFor="multi-date-created">Date Created</label>
              <input
                type="date"
                id="multi-date-created"
                className="pure-u-2-3"
                value={moment(template.dateCreated).format("YYYY-MM-DD")}
                // hacky insert of 'disabled=""' attribute needed by PureCSS
                {...{ disabled: '""' }}
              ></input>
            </div>
            <div className="pure-u-1-2">
              <label htmlFor="multi-last-modified">Last Modified</label>
              <input
                type="date"
                id="multi-last-modified"
                className="pure-u-2-3"
                value={moment(template.lastModified).format("YYYY-MM-DD")}
                // hacky insert of 'disabled=""' attribute needed by PureCSS
                {...{ disabled: '""' }}
              ></input>
            </div>

            {/* Component that visually displays what is in the schema currently */}
            <FormSchemaDisplay schema={template.schema} />
            {/* Component that can add items to the schema */}

            <button type="submit" className="pure-button pure-button-primary">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
