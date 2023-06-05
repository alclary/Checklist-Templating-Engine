export default async function searchWrapper(table, searchQuery) {
  let results = undefined;
  // return all templates
  if (searchQuery === "") {
    results = await table.toCollection().sortBy("lastModified");
  }
  // return items with matching single tag
  else if (searchQuery.startsWith("tag:")) {
    let tag = searchQuery.slice(4);
    tag = tag.split(" ")[0];
    results = await table
      .where("tags")
      .startsWithIgnoreCase(tag)
      .distinct()
      .sortBy("lastModified");
  }
  // return items with matching name
  else {
    results = await table
      .where("name")
      .startsWithIgnoreCase(searchQuery)
      .sortBy("lastModified");
  }
  return results;
}
