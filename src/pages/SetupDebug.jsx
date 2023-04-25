import RecordClass from "../classes/RecordClass";
import TemplateClass from "../classes/TemplateClass";
import { db } from "../functions/db";
import { useEffect } from "react";

export default function SetupDebug() {
  useEffect(() => {
    const template1 = new TemplateClass("Template 1");
    const template2 = new TemplateClass("Template 2");

    db.templates.put(template1);
    db.templates.put(template2);

    const record1 = new RecordClass("ID001238", 17);
    const record2 = new RecordClass("ID009938", 18);

    db.records.put(record1);
    db.records.put(record2);
  }, []);

  return (
    <>
      <p>SetupDebug successfully ran!</p>
    </>
  );
}
