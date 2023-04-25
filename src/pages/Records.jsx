import SearchBar from "../components/SearchBar";
import RecordListItem from "../components/RecordListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";

export default function Records() {
  const records = useLiveQuery(async () => {
    return await db.records.toArray();
  });

  return (
    <>
      <SearchBar />
      <div id="recordList" className="ui cards">
        {records?.map((record) => (
          <RecordListItem key={record.recordId} record={record} />
        ))}
      </div>
    </>
  );
}
