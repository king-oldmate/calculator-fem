import React from "react";
import "./Screen.css";

const Screen = ({ props }) => {
  const [screenDisplay] = props;
  return <div className="screen">{screenDisplay}</div>;
};

export default Screen;
