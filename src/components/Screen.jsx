import React from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  return <div className="screen">{Number(value).toLocaleString("en-US")}</div>;
};

export default Screen;
