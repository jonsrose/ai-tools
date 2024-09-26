import { BrowserRouter as Router, Route, Routes, RouteObject, RouteProps } from 'react-router-dom';
import Home from './components/Home';
import Greeting from './components/Greeting';
import StoreApiKey from './components/StoreApiKey';
import SpeechToText from './components/SpeechToText';

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/greeting", element: <Greeting /> },
  { path: "/store-api-key", element: <StoreApiKey /> },
  { path: "/speech-to-text", element: <SpeechToText /> },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...(route as RouteProps)} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
