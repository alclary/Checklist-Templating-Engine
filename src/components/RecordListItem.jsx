// import { useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function RecordListItem({ record }) {
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
    </div>
  );
}
