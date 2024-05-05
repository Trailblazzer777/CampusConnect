import React from 'react'
import { Link } from 'react-router-dom'

function EventPost(props) {
  return (
    <>
    <div className="timeline1" >
    <div className="timeline-cards">
       <Link to={`/EventInfo/${props.id}`}><div className="timeline-card1" >
                  <div className="card-img">
                    <img src={props.image} alt="event" />
                  </div>
                  <div className="card-text">
                    <h1>{props.name}</h1>
                    <p>{props.info}</p>
                    <h3>{props.time}</h3>
                    <h3>{props.venue}</h3>
                    <div className="date-boxes">
                <div className="date-box">
                  <h2>{props.date}</h2>
                </div>
              </div>
                  </div>
                </div>
                </Link>
        </div>
        
        </div>
        </>
  )
}

export default EventPost