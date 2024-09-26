import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { User } from 'firebase/auth';
import AuthForm from './AuthForm';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
    }
  };

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h2>
      <nav className="mb-4">
        <ul className="space-y-2">
          <li><Link to="/greeting" className="text-blue-500 hover:text-blue-700">Go to Greeting</Link></li>
          <li><Link to="/store-api-key" className="text-blue-500 hover:text-blue-700">Store API Key</Link></li>
          <li><Link to="/speech-to-text" className="text-blue-500 hover:text-blue-700">Speech to Text</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    </div>
  );
};

export default Home;