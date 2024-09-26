import React, { useState } from 'react';
import { functions, httpsCallable } from '../firebase';

const Home = () => {
  const [message, setMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');

  const callGreeting = async () => {
    try {
      const greeting = httpsCallable(functions, 'greeting');
      const result = await greeting() as { data: { message: string, hasApiKey: boolean } };
      setMessage(result.data.message);
      setHasApiKey(result.data.hasApiKey);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleStoreApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storeApiKey = httpsCallable(functions, 'storeApiKey');
      await storeApiKey({ apiKey: newApiKey });
      alert('API key stored successfully');
      setNewApiKey('');
      setHasApiKey(true);
    } catch (error) {
      console.error(error);
      alert('Error storing API key');
    }
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <button onClick={callGreeting}>Submit</button>
      {message && <p>{message}</p>}
      {hasApiKey && <p>OpenAI API Key is stored.</p>}

      <form onSubmit={handleStoreApiKey}>
        <input
          type="text"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          placeholder="Enter new OpenAI API key"
        />
        <button type="submit">Store API Key</button>
      </form>
    </div>
  );
};

export default Home;