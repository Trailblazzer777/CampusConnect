import React from 'react'
import EventPost from '../../Components/Posts/EventPost'
import {useState,useEffect} from 'react'

const PostCategory = (props) => {
    const [allposts, setAllPosts] = useState([]);

    const fetchInfo = () => { 
      fetch('http://localhost:4001/allposts') 
              .then((res) => res.json()) 
              .then((data) => setAllPosts(data))
      }
  
      useEffect(() => {
        fetchInfo();
      }, [])

    return(
        <div className=''>
            {allposts.map((item,i)=>{
                if(props.category===item.eventorganizer){
                    return <EventPost name={item.eventname} info={item.eventinfo} time={item.eventstime} venue={item.eventvenue}/>
                }
                else{
                    return null
                }
            })}
        </div>
    )
}

export default PostCategory