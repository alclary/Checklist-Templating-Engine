import { PropTypes } from "prop-types";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  newButtonSetter,
  newButtonState,
}) {
  return (
    <div id="searchwidget" className="row ui secondary menu">
      <div className="searchBar left menu">
        <div className="item">
          <div className="ui icon input">
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
      </div>
      <div className="item">
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
