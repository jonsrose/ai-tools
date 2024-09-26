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
      // The user state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
    }
  };

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div>
      <h2>Welcome, {user.email}!</h2>
      <nav>
        <ul>
          <li><Link to="/greeting">Go to Greeting</Link></li>
          <li><Link to="/store-api-key">Store API Key</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;