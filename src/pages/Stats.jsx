import { useEffect, useState } from "react";
import { db } from "../functions/db";

export default function Stats() {
  const [templateCount, setTemplateCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [templateTagCount, setTemplateTagCount] = useState(0);
  const [recordTagCount, setRecordTagCount] = useState(0);

  useEffect(() => {
    // Get counts of templates and records stats
    db.templates.count((count) => setTemplateCount(count));
    db.records.count((count) => setRecordCount(count));
    db.templates
      .orderBy("tags")
      .uniqueKeys((tagArray) => setTemplateTagCount(tagArray.length));
    db.records
      .orderBy("tags")
      .uniqueKeys((tagArray) => setRecordTagCount(tagArray.length));
  }, []);

  return (
    <>
      <div className="one column centered row">
        <div className="ui statistics">
          <div className="statistic">
            <div className="value">{recordCount}</div>
            <div className="label">Records</div>
          </div>
          <div className="statistic">
            <div className="value">{recordTagCount}</div>
            <div className="label">Unique Record Tags</div>
          </div>
          <div className="statistic">
            <div className="value">{templateCount}</div>
            <div className="label">Templates</div>
          </div>
          <div className="statistic">
            <div className="value">{templateTagCount}</div>
            <div className="label">Unique Template Tags</div>
          </div>
        </div>
      </div>
      <div className="one column centered row"></div>
    </>
  );
}
