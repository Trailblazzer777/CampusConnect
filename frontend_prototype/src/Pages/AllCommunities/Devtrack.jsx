import React from 'react'
import EventsList from '../../Components/EventsList/EventsList'
import EventsTimeline from '../../Components/EventsTimeline/EventsTimeline'
import thumbnail from '../../Components/Assets/thumbnail.jpg'
import { Link } from 'react-router-dom'
import './BB.css'


function Devtrack() {
  return (
    <div>
    <div className='backbutton'>
<Link to="/Communities"><button><h1>←</h1></button></Link>
   </div>
   <EventsList cname='DEVTRACK' cimage={thumbnail} cinfo='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five  but also the leap into electronic  remaining essentially  It was popularised in the  with the release of Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum' />
   <EventsTimeline category="Devtrack" />
</div>
  )
}

export default Devtrack