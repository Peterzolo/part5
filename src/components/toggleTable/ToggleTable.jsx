import React, { useState } from "react";

import "../toggleTable/ToggleTable.css";

const ToggleTable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="toggle-table-wrap">
      <div style={hideWhenVisible}>
        <button className="open-btn" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="close-btn" onClick={toggleVisibility}>
          close
        </button>
      </div>
    </div>
  );
};

export default ToggleTable;
