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
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Store API Key</h2>
      <form onSubmit={handleStoreApiKey} className="mb-4">
        <input
          type="text"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          placeholder="Enter new OpenAI API key"
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Store API Key
        </button>
      </form>
      <p className="text-sm text-gray-600 mb-4">
        Note: Your API key will be encrypted before storage for security.
      </p>
      <nav>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Home</Link>
      </nav>
    </div>
  );
};

export default StoreApiKey;