import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

function UserInterestsForm() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { user, setUserInterests } = useContext(AuthContext); // Assuming you have a method to set interests in your context
  let history =  useNavigate();

  const interests = ["Music", "Gaming", "Technology", "Sports", "Books"]; // Example interests

  const handleInterestChange = (interest) => {
    const currentIndex = selectedInterests.indexOf(interest);
    const newInterests = [...selectedInterests];

    if (currentIndex === -1) {
      newInterests.push(interest);
    } else {
      newInterests.splice(currentIndex, 1);
    }

    setSelectedInterests(newInterests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming setUserInterests updates the context and/or makes an API call
    setUserInterests(selectedInterests);
    console.log("Interests submitted:", selectedInterests);
    history.push('/chat'); // Redirect to chat room or another appropriate page
  };

  return (
    <div>
      <h2>Select Your Interests</h2>
      <form onSubmit={handleSubmit}>
        {interests.map((interest, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={interest}
              name={interest}
              value={interest}
              checked={selectedInterests.includes(interest)}
              onChange={() => handleInterestChange(interest)}
            />
            <label htmlFor={interest}>{interest}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserInterestsForm;
