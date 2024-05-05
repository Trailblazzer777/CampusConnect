import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import wreck from "../Assets/wreck.jpg";

function Navbar() {
  return (
    <>
    <div className='navbar' >
    
          <div className="logo">
            <h2>CampusConnect</h2>
          </div>
           <div className='nav-search'>
                <input className='nav-text'
                    type="text"
                    placeholder="Search....."
                />
                <button className="search-button"></button>
            </div>
            <div>
            <ul className="nav-menu1">
                <li>
               <Link to="/Home"><button className='page-button'>H</button></Link> 
                </li>
                <li>
               <Link to=""><button className='page-button'>E</button></Link>
                </li>
                <li>
                <Link to="/EventInfo"><button className='page-button'>I</button></Link>
                </li>
                <li>
                <Link to="/Communities"><button className='page-button'>C</button></Link>
                </li>
            </ul>
            </div>
            <div>
            <ul className="nav-menu2">
                <li>
                <Link to='/'><button id='subbutton'></button></Link>
                </li>
                <li>
                <Link to="/CreaterPage"><button id='subbutton'>CP</button></Link>
                </li>
                <li>
                {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>
        :<Link to='/' style={{ textDecoration: 'none' }}><button id='subbutton'>Login</button></Link>}
                </li>
            </ul>
            </div>
            <div className='profile'>
              <img className="profile-button" src={wreck} alt='img'></img>{/* Add this line */}
            </div>
    </div>
    </>
  )
}

export default Navbar