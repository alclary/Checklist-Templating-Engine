import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
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
    <>
      <h1 className="ui header">Templates View</h1>

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
          <Card key={template.id} data={template} type="Template" />
        ))}
      </div>
    </>
  );
}
