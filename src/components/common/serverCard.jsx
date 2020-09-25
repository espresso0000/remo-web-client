import React from "react";
import getServerImage from "../functional/getServerImage/index";
import "./serverCard.css";

const ServerCard = ({
  server_name,
  owner_name,
  created,
  members,
  live_devices,
  image_id,
}) => {
  const renderServerImage = () => {
    return (
      <div className="server-img-container">
        <img
          className="server-img"
          alt=""
          src={getServerImage({ image_id: image_id })}
        />
      </div>
    );
  };

  const date = new Date(parseInt(created)).toDateString();

  return (
    <div className="server-info-card">
      {renderServerImage()}
      <div className="details-container">
        <div className="details larger">
          <span className="key-name">Server Name: </span>
          {server_name}
        </div>
        <div className="details">
          <span className="key-name">Owner: </span>
          {owner_name}
        </div>
        <div className="details">
          <span className="key-name">Created: </span> {date}
        </div>
        <div className="details">
          {" "}
          <span className="key-name">Members: </span>
          {members}
        </div>
        <div className="details">
          <span className="key-name">Live Devices: </span>
          {live_devices.length}
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
