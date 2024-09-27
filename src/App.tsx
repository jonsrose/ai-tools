import React, { useState } from 'react';
import HelpModal from './components/HelpModal';
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

const App: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

  return (
    <div className="App flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-10">
          {/* Common header */}
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Speech To Text</h1>
          
          <Router basename="/speech-to-text">
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} {...(route as RouteProps)} />
              ))}
            </Routes>
          </Router>
        </div>
        {/* Help button */}
        <button
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
          onClick={openHelpModal}
        >
          Help
        </button>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={closeHelpModal} />
    </div>
  );
};

export default App;
