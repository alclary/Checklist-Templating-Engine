import { PropTypes } from "prop-types";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  newButtonSetter,
  newButtonState,
}) {
  return (
    <div id="searchbar" className="searchBar row">
      <div className="eight wide column">
        <div className="ui fluid icon input">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchQuery(e.target.value);
            }}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div>
        <i
          className="large plus icon"
          onClick={() => {
            newButtonSetter(!newButtonState);
          }}
        ></i>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  newButtonSetter: PropTypes.func,
  newButtonState: PropTypes.bool,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};
