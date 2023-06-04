import SearchBar from "../components/SearchBar";
import TemplateListItem from "../components/TemplateListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";
import { useState } from "react";
import NewTemplateModalForm from "../components/NewTemplateModalForm";

export default function Templates() {
  let [showTemplateCreate, setShowTemplateCreate] = useState(false);

  const templates = useLiveQuery(async () => {
    return await db.templates.toArray();
  });

  return (
    <div className="ui grid">
      <div className="pageTitle row">
        <h2>Templates View</h2>
      </div>

      <SearchBar
        newAction={setShowTemplateCreate}
        newState={showTemplateCreate}
      />

      {/* Conditionally shown new template modal form */}
      {showTemplateCreate && (
        <NewTemplateModalForm setShowTemplateCreate={setShowTemplateCreate} />
      )}

      <div id="templateList" className="row ui cards">
        {templates?.map((template) => (
          <TemplateListItem key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
