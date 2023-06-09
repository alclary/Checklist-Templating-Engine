import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isTemplateRoute, setTemplateRoute] = useState("");

  useEffect(() => {
    setTemplateRoute(location.pathname === "/templates" ? true : false);
  }, [location.pathname]);

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateTemplates = () => {
    navigate("/templates");
  };
  const navigateRecords = () => {
    navigate("/records");
  };
  const navigateBack = () => {
    navigate(-1);
  };

  let condNavItem;
  if (isTemplateRoute) {
    condNavItem = (
      <a className="item" onClick={navigateRecords}>
        <i className="large tasks icon"></i>
        Records
      </a>
    );
  } else {
    condNavItem = (
      <a className="item" onClick={navigateTemplates}>
        <i className="large columns icon"></i>
        Templates
      </a>
    );
  }

  return (
    <>
      <div id="navWrapper" className="row">
        <div id="navBar" className="ui compact menu">
          <a className="item" onClick={navigateHome}>
            <i className="large home icon"></i>
            Home
          </a>
        {condNavItem}
          <a className="item" onClick={navigateBack}>
            <i className="large arrow left icon"></i>
            Back
          </a>
        </div>
      </div>
      <div className="ui row divider"></div>
    </>
  );
}
