import SearchBar from "../components/SearchBar";
import ListItem from "../components/ListItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../functions/db";

export default function Templates() {
  const templates = useLiveQuery(async () => {
    return await db.templates.toArray();
  });

  return (
    <>
      <SearchBar />
      <div id="templateList" className="ui cards">
        {templates?.map((template) => (
          <ListItem key={template.id} template={template} />
        ))}
      </div>
    </>
  );
}
