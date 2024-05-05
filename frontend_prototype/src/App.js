
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import EventInfo from './Pages/EventInfo/EventInfo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Communities from './Pages/Communities/Communities';
import Login from './Pages/Login/SignUp/Login';
import SignUp from './Pages/Login/SignUp/SignUp';
import Devtrack from './Pages/AllCommunities/Devtrack';
import Face from './Pages/AllCommunities/Face';
import Force from './Pages/AllCommunities/Force';
import Facit from './Pages/AllCommunities/FACIT';
import MyEvents from './Pages/MyEvents/MyEvents';



function MainApp() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && location.pathname !== '/SignUp' && <Navbar />}
      <Routes>
        <Route path='/Home' element={<Home/>}/>  
        <Route path="/Devtrack" element={<Devtrack category='Devtrack'/>}/>
        <Route path="/Face" element={<Face category='Face'/>}/>
        <Route path="/Force" element={<Force category='Force'/>}/>
        <Route path="/Facit" element={<Facit category='Facit'/>}/>
        <Route path="/EventInfo" element={<EventInfo/>}>
          <Route path=':EventInfoId' element={<EventInfo/>}/>
        </Route>
        <Route path="/Communities" element={<Communities/>}/>
        <Route path="/MyEvents" element={<MyEvents/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
