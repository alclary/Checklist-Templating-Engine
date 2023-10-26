import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { db } from "../functions/db";
import { useEffect, useState } from "react";
import NewRecordModalForm from "../components/NewRecordModalForm";

export default function Records() {
  let [records, setRecords] = useState([]);
  let [showRecordCreate, setShowRecordCreate] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // This is a relatively expensive way to full text search record names;
    //  efficient/indexed full test search is currently unsupported by dexie.
    //  Not ideal for large record databases.
    const matchingRecords = async () => {
      if (searchQuery == "") {
        setRecords(await db.records.toArray());
      } else {
        // i represents case insensitive flag for regex
        let regex = new RegExp(searchQuery, "i");
        setRecords(
          await db.records.filter((record) => regex.test(record.name)).toArray()
        );
      }
    };
    matchingRecords();
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
        {records.map((record) => (
          <Card key={record.name} data={record} type="Record" />
        ))}
      </div>
    </>
  );
}
