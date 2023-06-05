import SearchBar from "../components/SearchBar";
import TemplateListItem from "../components/TemplateListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";
import { useState } from "react";
import NewTemplateModalForm from "../components/NewTemplateModalForm";
import searchWrapper from "../functions/searchWrapper";

export default function Templates() {
  let [showTemplateCreate, setShowTemplateCreate] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  const templates = useLiveQuery(async () => {
    return searchWrapper(db.templates, searchQuery);
  }, [searchQuery]);

  return (
    <div className="ui grid">
      <div className="pageTitle row">
        <h2>Templates View</h2>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newButtonSetter={setShowTemplateCreate}
        newButtonState={showTemplateCreate}
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
