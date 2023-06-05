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

    db.templates
      .put(template1)
      .then((id) => {
        console;
        const record1 = new RecordClass("ID001238", id);
        return record1;
      })
      .then((record1) => {
        record1.init();
      });

    db.templates
      .put(template2)
      .then((id) => {
        const record2 = new RecordClass("ID009938", id);
        return record2;
      })
      .then((record2) => {
        record2.init();
      });
  }, []);

  return (
    <>
      <p>SetupDebug successfully ran!</p>
    </>
  );
}
