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
      <div className="column" onClick={navigateRecords}>
        <i className="big tasks icon"></i>
      </div>
    );
  } else {
    condNavItem = (
      <div className="column" onClick={navigateTemplates}>
        <i className="big columns icon"></i>
      </div>
    );
  }

  return (
    <>
      <div id="navbar" className="row">
        <div className="thirteen wide column"></div>
        <div className="column" onClick={navigateHome}>
          <i className="big home icon"></i>
        </div>
        {condNavItem}
        <div className="column" onClick={navigateBack}>
          <i className="big arrow left icon"></i>
        </div>
      </div>
      <div className="ui row divider"></div>
    </>
  );
}
