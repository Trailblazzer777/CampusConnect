import React,{useEffect, useState} from 'react'
import './CreaterPage.css'
import { Link } from 'react-router-dom'
import removebtn from '../../Components/Assets/removebtn.png'


function CreaterPage() {
  const [allposts, setAllposts] = useState([]);

  const fetchInfo = async()=>{
    await fetch('http://localhost:4001/allposts')
    .then((res)=>res.json())
    .then((data)=>{setAllposts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removePost = async(id)=>{
    await fetch(`http://localhost:4001/removepost`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id}),
    })
    await fetchInfo();
    
  }

  return (
    <div className='creator-page-container'>
        <div className='creator-page-head'>
          <h1>My Events</h1>
          <Link to="/CreaterInput"><button className='creator-page-button'>Create Event</button></Link>
          <Link to="/RegisteredList"><button className='creator-page-button'>Registered Users</button></Link>
          </div>
          <div className='creater-page-body'>
            <div className='list-allposts'>
              {allposts.slice().reverse().map((post,index)=>{
                return <>
                <hr />
                <div key={index} className='post'>
                  <img src={post.image} alt="" className="post-poster" />
                  <p>{post.eventname}</p>
                  <p>{post.eventinfo}</p>
                  <p>{post.eventdate}</p>
                  <p>{post.eventstime}</p>
                  <p>{post.eventetime}</p>
                  <p>{post.eventvenue}</p>
                  <p>{post.eventorganizer}</p>
                  <img onClick={()=>{removePost(post.id)}} src={removebtn} alt="" className="post-remove-btn" />
                </div>
                </>
              })}
            </div>
          </div>
    </div>
  )
}

export default CreaterPage