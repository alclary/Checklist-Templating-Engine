import TemplateClass from "../classes/TemplateClass";
import { db } from "../functions/db";
import { useEffect } from "react";

export default function SetupDebug() {
  useEffect(() => {
    // db.delete();
    const template1 = new TemplateClass("Template 1");
    const template2 = new TemplateClass("Template 2");

    db.templates.put(template1);
    db.templates.put(template2);
  }, []);

  return (
    <>
      <p>SetupDebug successfully ran!</p>
    </>
  );
}
