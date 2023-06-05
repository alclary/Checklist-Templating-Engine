import SearchBar from "../components/SearchBar";
import RecordListItem from "../components/RecordListItem";
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
    <div className="ui grid">
      <div className="pageTitle row">
        <h2>Records View</h2>
      </div>

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
          <RecordListItem key={record.name} record={record} />
        ))}
      </div>
    </div>
  );
}
