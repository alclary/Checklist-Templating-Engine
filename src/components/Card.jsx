import { PropTypes } from "prop-types";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function Card({ data, type }) {
  const navigate = useNavigate();

  function handleClick() {
    // Define what happens when card is clicked; ternary dependent on 'type'
    // prop.
    {
      type == "Template"
        ? navigate("/templates/" + data.id)
        : navigate("/records/" + data.id);
    }
  }
  return (
    <div
      className="ui raised link card"
      onClick={handleClick}
    >
      <div className="content">
        <div className="header">{data.name}</div>
        <div className="meta">
          {/* Card created date inforamtion dependent on 'type' prop */}
          {type == "Template" ? (
            <span>
              Created {moment(data.dateCreated).startOf("day").fromNow()}
            </span>
          ) : (
            <span>Last modified, {moment(data.lastModified).calendar()}</span>
          )}
        </div>
      </div>
      <div className="extra content">
        {data.tags.slice(0, 4).map((tag) => (
          <span key="tag" className="ui label">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

Card.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
};
