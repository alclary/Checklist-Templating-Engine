import SearchBar from "../components/SearchBar";
import RecordListItem from "../components/RecordListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";
import { useState } from "react";
import NewRecordModalForm from "../components/NewRecordModalForm";

export default function Records() {
  let [showRecordCreate, setShowRecordCreate] = useState(false);

  const records = useLiveQuery(async () => {
    return await db.records.toArray();
  });

  return (
    <div className="ui grid">
      <div className="pageTitle row">
        <h2>Records View</h2>
      </div>

      <SearchBar newAction={setShowRecordCreate} newState={showRecordCreate} />
      {showRecordCreate && (
        <NewRecordModalForm setShowRecordCreate={setShowRecordCreate} />
      )}
      <div id="recordList" className="ui cards">
        {records?.map((record) => (
          <RecordListItem key={record.recordId} record={record} />
        ))}
      </div>
    </div>
  );
}
