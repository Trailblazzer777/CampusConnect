import React from 'react'
import EventDetails from '../../Components/EventDetails/EventDetails'
import { Link, useParams } from 'react-router-dom'
import './EventInfo.css'
import { useContext , useEffect } from 'react'
import { PostContext } from '../../Context/PostContext'


const EventInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const {posts} = useContext(PostContext);
  const { EventInfoId } = useParams();
  const post = posts.find((e) => e.id === Number(EventInfoId));

  if (!post) {
    return <div>Loading...</div>;
  }

  const organizer = post.eventorganizer;

  return (
    <div>
      <div className='backbutton'>
        <Link to={`/${organizer}`}><button><h1>←</h1></button></Link>
      </div>
      
      <EventDetails post={post}/> {/* Pass the id as a prop to EventDetails */}
    </div>
  )
}

export default EventInfo