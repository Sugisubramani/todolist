import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    mobile: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Failed to register');
      }
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter First Name"
              value={userData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter Last Name"
              value={userData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={userData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={userData.dob ? userData.dob.split("T")[0] : ""}
              onChange={handleInputChange}
            />

          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Enter Mobile Number"
              value={userData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>
        Already have an Account?
        <button onClick={handleLoginRedirect} className="login-button">
          Login Here
        </button>
      </p>
    </div>
  );
};

export default SignUp;
