import React, { useState } from 'react';
import { functions, httpsCallable } from '../firebase';
import { Link } from 'react-router-dom';

const StoreApiKey = () => {
  const [newApiKey, setNewApiKey] = useState('');

  const handleStoreApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storeApiKey = httpsCallable(functions, 'storeApiKey');
      await storeApiKey({ apiKey: newApiKey });
      alert('API key stored successfully');
      setNewApiKey('');
    } catch (error) {
      console.error(error);
      alert('Error storing API key');
    }
  };

  return (
    <div>
      <h2>Store API Key</h2>
      <form onSubmit={handleStoreApiKey}>
        <input
          type="text"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          placeholder="Enter new OpenAI API key"
        />
        <button type="submit">Store API Key</button>
      </form>
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
};

export default StoreApiKey;