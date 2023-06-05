import { PropTypes } from "prop-types";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function RecordCard({ record }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/records/" + record.id);
  }
  return (
    <div className="ui card" onClick={handleClick}>
      <div className="content">
        <div className="header">{record.name}</div>
        <div className="meta">
          <span>Last modified, {moment(record.lastModified).calendar()}</span>
        </div>
      </div>
      <div className="extra content">
        {record.tags.slice(0, 4).map((tag) => (
          <span key="tag" className="ui label">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

RecordCard.propTypes = {
  record: PropTypes.object,
};
