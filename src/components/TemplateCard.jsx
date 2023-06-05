import { PropTypes } from "prop-types";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function TemplateCard({ template }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/templates/" + template.id);
  }
  return (
    <div className="ui card" onClick={handleClick}>
      <div className="content">
        <div className="header">{template.name}</div>
        <div className="meta">
          <span>
            Created {moment(template.dateCreated).startOf("day").fromNow()}
          </span>
        </div>
      </div>
      <div className="extra content">
        {template.tags.slice(0, 4).map((tag) => (
          <span key="tag" className="ui label">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

TemplateCard.propTypes = {
  template: PropTypes.object,
};
