import React from 'react'
import './Home.css'
import HomeSidebar1 from '../../Components/HomeSidebar/HomeSidebar1'
import HomeSidebar2 from '../../Components/HomeSidebar/HomeSidebar2'
import HomeFeed from '../../Components/HomeFeed/HomeFeed'

function Home() {
  return (  
     <div className='home-container'>
       <HomeSidebar1/>
       <HomeSidebar2/>
       <HomeFeed/>
     </div>
  )
}

export default Home