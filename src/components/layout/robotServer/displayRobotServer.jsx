import React from "react";
import "./robotServer.css";
import defaultImages from "../../../imgs/placeholders";

const DisplayRobotServer = ({ serverName }) => {
  return (
    <div className="display-robot-server-container">
      <img className="display-robot-server-img" src={defaultImages.default01} />
      <div className="display-robot-server">{serverName}</div>
    </div>
  );
};

export default DisplayRobotServer;
