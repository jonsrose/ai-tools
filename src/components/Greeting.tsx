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
    <div>
      <h2>Greeting</h2>
      <button onClick={callGreeting}>Get Greeting</button>
      {message && <p>{message}</p>}
      {hasApiKey && <p>OpenAI API Key is stored.</p>}
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
};

export default Greeting;