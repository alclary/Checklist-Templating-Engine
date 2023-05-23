import { PropTypes } from "prop-types";

export default function SearchBar({ newAction, newState }) {
  return (
    <div id="searchbar" className="searchBar row">
      <div className="eight wide column">
        <div className="ui fluid icon input">
          <input type="text" placeholder="Search..." />
          <i className="search icon"></i>
        </div>
      </div>
      <div>
        <i
          className="large plus icon"
          onClick={() => {
            newAction(!newState);
          }}
        ></i>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  newAction: PropTypes.func,
  newState: PropTypes.bool,
};
