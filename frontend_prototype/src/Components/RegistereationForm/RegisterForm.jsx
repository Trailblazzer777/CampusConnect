import React, { useState } from 'react';
import './RegisterForm.css'; // Import your CSS file
import { useContext } from 'react';
import { PostContext } from '../../Context/PostContext';
import { useParams } from 'react-router-dom';

const RegisterForm = ({ onSubmit }) => {
  const { addToRegisteredList } = useContext(PostContext);

  const registerUser = async (user, post) => {
    try {
      const response = await fetch('http://localhost:4001/register', {
        // replace with the actual URL of your endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          postId: post.id,
          eventname: post.eventname,
          eventorganizer: post.eventorganizer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        addToRegisteredList(post.id);
        alert('Registration successful!');
      } else {
        // If the server responds with a message, display it
        if (data.message) {
          alert(`Registration failed: ${data.message}`);
        } else {
          alert('Registration failed.');
        }
      }
    } catch (error) {
      // Log the error and display a message
      console.error('Error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    school: '',
    course: '',
    section: '',
    email: '',
    phone: '',
  });

  const { posts } = useContext(PostContext);
  const { EventInfoId } = useParams();
  const post = posts.find((e) => e.id === Number(EventInfoId));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    registerUser(formData, post); // Pass the post object to the registerUser function
  };

  return (
    <div>
      <div className="overlay"></div> {/* Background overlay */}
      <div className="register-form-container">
        <h2>Register for Event</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>SRN:</label>
            <input type="text" name="srn" value={formData.srn} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>SCHOOL:</label>
            <input type="text" name="school" value={formData.school} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>COURSE:</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>SECTION:</label>
            <input type="text" name="section" value={formData.section} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
