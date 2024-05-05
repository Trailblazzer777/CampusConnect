import React from "react";
import "./HomeFeed.css";
import { useState, useEffect } from "react";
import FeedPost from "../Posts/FeedPost";


const HomeFeed = ()  =>{

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
      <div className='home-feed'>
      {allposts.slice().reverse().map((item, i) => {
  return <FeedPost key={i} id={item.id} name={item.eventname} info={item.eventinfo} time={item.eventstime} venue={item.eventvenue} date={item.eventdate} image={item.image}/>
})}
        </div>
    </>
  )
}

export default HomeFeed;



