import RecordClass from "../classes/RecordClass";
import TemplateClass from "../classes/TemplateClass";
import { db } from "../functions/db";
import { useEffect } from "react";

export default function SetupDebug() {
  useEffect(() => {
    db.templates.clear();
    db.records.clear();

    const template1 = new TemplateClass("Template 1");
    const template2 = new TemplateClass("Template 2");

    db.templates.put(template1);
    db.templates.put(template2);

    const record1 = new RecordClass("ID001238", 1);
    const record2 = new RecordClass("ID009938", 2);

    record1.init();
    record2.init();
  }, []);

  return (
    <>
      <p>SetupDebug successfully ran!</p>
    </>
  );
}
