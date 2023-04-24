// import { useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function ListItem({ template }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/templates/" + template.id);
  }
  return (
    <div className="ui card" onClick={handleClick}>
      <div className="content">
        <div className="header">{template.templateName}</div>
        <div className="meta">
          <span>
            Created {moment(template.dateCreated).startOf("day").fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
}
