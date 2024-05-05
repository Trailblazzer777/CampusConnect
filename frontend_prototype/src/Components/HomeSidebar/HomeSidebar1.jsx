import React from 'react'
import './HomeSidebar1.css'
import { Link } from 'react-router-dom'

function HomeSidebar1() {
  return (
    <div className='sidebar1-container'>
        <div className='sidebar1-back'>
        <Link to="/Communities"><div className='sidebar1-topbox'>
            <h2>Communities</h2>
            </div></Link>
            <div className='sidebar1-bottombox'>
            <h2>Groups</h2>
            </div>
        </div>
    </div>
  )
}

export default HomeSidebar1