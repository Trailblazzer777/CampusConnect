import React from "react";
import "./EventsList.css";

function EventsList(props) {
  return (
    <div className="container">
      <div className="container-head">
        <div className="head-header">
          <h1>Explore Events/{props.cname}</h1>
          <div className="head-buttons">
            <button className="button"><h2>Join</h2></button>
            <button className="button"><h2>Subscribe</h2></button>
          </div>
        </div>
        <div className="head-content">
          <div className="head-img">
            <img src={props.cimage} alt="event" />
          </div>
          <div className="head-text">
            <h1>{props.cname}</h1>
            <h3>
              {props.cinfo}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsList;
