import React from 'react'
import './FeedPost.css'
import { Link } from 'react-router-dom'

function FeedPost(props) {
  return (
    <> 
   <div className='home-content'>
            <div className='home-content-head'>
                <div className='home-content-img'>
                    <img src={props.image}  alt=""></img>
                </div>
                <Link to={`/EventInfo/${props.id}`}><button>Know More</button></Link>
            </div>
            <div className='home-content-text'>
                    <h1>{props.name}</h1>
                    <p>{props.info}</p>
                    <h3>{props.time}</h3>
                    <h3>{props.venue}</h3>
            </div>
    </div>
</>
  )
}

export default FeedPost