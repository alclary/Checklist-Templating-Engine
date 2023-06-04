import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../functions/db";
import validator from "@rjsf/validator-ajv8";
import SchemaForm from "@rjsf/semantic-ui";
import RecordMetadataForm from "../components/RecordMetadataForm";

export default function Record() {
  const { recordId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [record, setRecord] = useState();

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    await db.records
      .where("id")
      .equals(Number(recordId))
      .first((record) => {
        setRecord(record);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  };

  function handleSubmit() {
    db.records.put(record);
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
      <RecordMetadataForm record={record} setRecord={setRecord} />
      <SchemaForm
        schema={record.schema}
        validator={validator}
        formData={record.formData}
        uiSchema={uiSchema}
        onChange={(e) => {
          console.log(e);
          setRecord({ ...record, formData: e.formData });
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <button type="submit">Save Record</button>
        </div>
      </SchemaForm>
    </div>
  );
}
