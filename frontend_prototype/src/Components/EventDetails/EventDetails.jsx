import React, { useState } from 'react';
import './EventDetails.css';
import Breadcrum from '../../Components/Breadcrums/Breadcrum';
import RegisterForm from '../RegistereationForm/RegisterForm';


const EventDetails = (props) => {
  const { post } = props;

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    // Show the register form when register button is clicked
    setShowRegisterForm(true);
  };

  const handleSubmitForm = (formData) => {
    // Handle form submission here, e.g., call addToRegisteredList function
    console.log(formData);
    // Optionally, you can hide the form after submission
    setShowRegisterForm(false);
  };

  return (
    <div className='container1'>
      <div className='container1-head'>
        <div className="header">
          <h1><Breadcrum post={post}></Breadcrum></h1>
        </div>
        <div className="container1-body">
          <div className="body-head">
            <div className="head1-img" >
              <img src={post.image} alt="event"/>
            </div>
            <div className="head1-text">
              <h2> Hosted by</h2>
              <h3>{post.eventorganizer}</h3>
            </div>
          </div>
          <div className="body1-content">
            <div className="body-info">
              <h1>{post.eventname}</h1>
              <h1>{post.eventinfo}</h1> 
            </div>
            <div className="event-date-time"><h2>{post.eventdate}  <label > time: </label>{post.eventstime}</h2></div>
            <div className="event-location"><h2>{post.eventvenue}</h2></div>
            <div className="registeration">
              <h2>Registeration</h2>
              <button className="button" onClick={handleRegisterClick}><h3>Register</h3></button>
            </div>
            <div className="event-description">
              <h3>Event Description</h3>
              <h3>{post.eventdescription}</h3>
            </div>
          </div>
          {showRegisterForm && <RegisterForm post={post} onSubmit={handleSubmitForm} />}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;






