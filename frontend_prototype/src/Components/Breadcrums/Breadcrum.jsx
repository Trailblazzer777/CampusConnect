import React from 'react'

const Breadcrum = (props) => {
    const {post} = props;
  return (
    <div>
        HOME  / COMMUNITIES  / {post.eventorganizer}  /  {post.eventname}
        <br></br>
    </div>
  )
}

export default Breadcrum
