import SearchBar from "../components/SearchBar";
import RecordCard from "../components/RecordCard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";
import { useState } from "react";
import NewRecordModalForm from "../components/NewRecordModalForm";
import searchWrapper from "../functions/searchWrapper";

export default function Records() {
  let [showRecordCreate, setShowRecordCreate] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  const records = useLiveQuery(async () => {
    return searchWrapper(db.records, searchQuery);
  }, [searchQuery]);

  return (
    <>
      <h1 className="ui header">Records View</h1>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newButtonSetter={setShowRecordCreate}
        newButtonState={showRecordCreate}
      />

      {/* Conditionally shown new record modal form */}
      {showRecordCreate && (
        <NewRecordModalForm setShowRecordCreate={setShowRecordCreate} />
      )}

      <div id="recordList" className="row ui cards">
        {records?.map((record) => (
          <RecordCard key={record.name} record={record} />
        ))}
      </div>
    </>
  );
}
