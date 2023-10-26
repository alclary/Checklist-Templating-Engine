import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { db } from "../functions/db";
import { useEffect, useState } from "react";
import NewTemplateModalForm from "../components/NewTemplateModalForm";

export default function Templates() {
  let [templates, setTemplates] = useState([]);
  let [showTemplateCreate, setShowTemplateCreate] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // This is a relatively expensive way to full text search template names;
    //  efficient/indexed full test search is currently unsupported by dexie.
    const matchingRecords = async () => {
      if (searchQuery == "") {
        setTemplates(await db.templates.toArray());
      } else {
        // i represents case insensitive flag for regex
        let regex = new RegExp(searchQuery, "i");
        setTemplates(
          await db.templates
            .filter((template) => regex.test(template.name))
            .toArray()
        );
      }
    };
    matchingRecords();
  }, [searchQuery]);

  return (
    <>
      <h1 className="ui header">Templates View</h1>

      {/* Searches all templates and displays as cards */}
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

      {/* List of template cards, dependent on SearchBar input (if any) */}
      <div id="templateList" className="row ui cards">
        {templates?.map((template) => (
          <Card key={template.id} data={template} type="Template" />
        ))}
      </div>
    </>
  );
}
