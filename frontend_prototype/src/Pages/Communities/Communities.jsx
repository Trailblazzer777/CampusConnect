import React from 'react'
import './Communities.css'
import { Link } from 'react-router-dom'

function Communities() {
  return (
    <div>
       <div className='backbutton'>
    <Link to="/Home"><button><h1>←</h1></button></Link>
        </div>
    <div className='communities-container'>
        <div className='communities-head'>
            <h1>Communities</h1>
        </div>
        <div className='communities-list'>
        <Link to="/Force"><div className='community'>FORCE</div></Link>
          <Link to="/Facit"><div className='community'>FACIT</div></Link>
          <Link to="/Face"><div className='community'>FACE</div></Link>
          <Link to="/Devtrack"><div className='community'>DEVTRACK</div></Link>
          <div className='community'>MARK22</div>
          <div className='community'>MARS</div>
          <div className='community'>GDSC</div>
          <div className='community'>ELITE</div>
        </div>
    </div>
    </div>
  )
}

export default Communities