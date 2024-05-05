import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AdminHome from './Pages/AdminHome';
import CreaterPage from './Components/Createrpages/CreaterPage';
import CreaterInput from './Components/Createrpages/CreaterInput';
import RegisteredUsers from './Components/RegisteredList/RegisteredUsers';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
          <Route path='/' element={<AdminHome/>}/>
          <Route path="/CreaterPage" element={<CreaterPage/>}/>
          <Route path="/CreaterInput" element={<CreaterInput/>}/>
          <Route path='/RegisteredList' element={<RegisteredUsers/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
