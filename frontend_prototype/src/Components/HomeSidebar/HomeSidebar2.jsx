import React from 'react'
import './HomeSidebar2.css'
import { Link } from 'react-router-dom'

function HomeSidebar2() {
  return (
    <div className='sidebar2-container'>
        <div className='sidebar2-back'>
        <Link to="/MyEvents"> <div className='sidebar2-topbox'>
            <h2>MyEvents</h2>
            </div></Link>
            <div className='sidebar2-bottombox'>
            <h2>Calender</h2>
            </div>
        </div>
    </div>
  )
}

export default HomeSidebar2