import React, { useContext } from 'react';
import AuthForm from './components/AuthForm';
import { AuthContext } from './contexts/AuthContext';
import Home from './components/Home';

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return <div>{currentUser ? <Home /> : <AuthForm />}</div>;
};

export default App;
