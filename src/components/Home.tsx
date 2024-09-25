import React, { useState } from 'react';
import { functions, httpsCallable } from '../firebase';

const Home = () => {
  const [message, setMessage] = useState('');

  const callGreeting = async () => {
    try {
      const greeting = httpsCallable(functions, 'greeting');
      const result = await greeting();
      setMessage(result.data.message);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <button onClick={callGreeting}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;