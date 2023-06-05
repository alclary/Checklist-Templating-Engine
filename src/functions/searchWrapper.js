export default async function searchWrapper(collection, searchQuery) {
  // return all templates
  if (searchQuery === "") {
    return await collection.toArray();
  }
  // return templates with matching single tag
  else if (searchQuery.startsWith("tag:")) {
    let tag = searchQuery.slice(4);
    tag = tag.split(" ")[0];
    return await collection
      .where("tags")
      .startsWithIgnoreCase(tag)
      .distinct()
      .toArray();
  }
  // return templates with matching name
  else {
    return await collection
      .where("name")
      .startsWithIgnoreCase(searchQuery)
      .toArray();
  }
}
