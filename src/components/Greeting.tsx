import { useState } from 'react';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { Link } from 'react-router-dom';

const Greeting = () => {
  const [message, setMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

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

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Greeting</h2>
      <button onClick={callGreeting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Get Greeting</button>
      {message && <p className="mb-2">{message}</p>}
      {hasApiKey && <p className="mb-4 text-green-600">OpenAI API Key is stored.</p>}
      <nav>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Home</Link>
      </nav>
    </div>
  );
};

export default Greeting;