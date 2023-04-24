// import { useState } from "react";

export default function SearchBar() {
  return (
    <div id="searchbar" className="row ui">
      <div className="eight wide column">
        <div className="ui fluid icon input">
          <input type="text" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
      </div>
      <div>
        <i className="large plus icon"></i>
      </div>
    </div>
  );
}
