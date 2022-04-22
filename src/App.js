import './App.css';
import React, { useState } from 'react';
import ProfileEdit from './ProfileEdit';

function App() {
  const [userId, setUserId] = useState(1);

  const userIds = [1, 2, 3, 4];

  return (
    <div className="App">
      {userIds.map((id) => (
        <button key={id} onClick={() => setUserId(id)}>
          User ID {id}
        </button>
      ))}
      <h2>User ID {userId}</h2>
      <ProfileEdit userId={userId} />
    </div>
  );
}

export default App;
