import SearchBar from "../components/SearchBar";
import TemplateListItem from "../components/TemplateListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";

export default function Templates() {
  const templates = useLiveQuery(async () => {
    return await db.templates.toArray();
  });

  return (
    <>
      <h2>Templates View</h2>
      <SearchBar />
      <div id="templateList" className="row ui four cards">
        {templates?.map((template) => (
          <TemplateListItem key={template.id} template={template} />
        ))}
      </div>
    </>
  );
}
