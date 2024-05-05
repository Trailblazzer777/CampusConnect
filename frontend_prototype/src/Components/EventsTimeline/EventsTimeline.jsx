import React from "react";
import "./EventsTimeline.css";
import { Link } from "react-router-dom";
import EventPost from "../Posts/EventPost";
import { useState, useEffect } from "react";


const EventsTimeline = (props)  =>{

  const [allposts, setAllPosts] = useState([]);

  const fetchInfo = () => { 
    fetch('http://localhost:4001/allposts') 
            .then((res) => res.json()) 
            .then((data) => setAllPosts(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])

  return (
    <>
      <div className="container">
        <div className="container-body">
          <div className="body-content">
            <h1>Events here</h1>
          </div>
          <div className="timelines">

              

                <div className=''>
                {allposts.slice().reverse().map((item, i) => {
    if (props.category === item.eventorganizer) {
        return (
            <Link key={i} to="/EventInfo">
                <EventPost id={item.id} name={item.eventname} info={item.eventinfo} time={item.eventstime} venue={item.eventvenue} date={item.eventdate} image={item.image}/>
            </Link>
        );
    } else {
        return null;
    }
            })}
        
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventsTimeline;


/* <div className="marker">
                <div className="marker-circle"></div>
                <div className="marker-line"></div>
              </div> */