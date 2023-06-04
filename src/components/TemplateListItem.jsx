// import { useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function TemplateListItem({ template }) {
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
    </div>
  );
}
