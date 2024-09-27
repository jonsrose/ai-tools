import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">How to Use the App</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Setting up your OpenAI API Key:</strong>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Sign up for an OpenAI account and obtain an API key</li>
              <li>In the app, navigate to the settings or profile section</li>
              <li>Enter your API key in the designated field</li>
              <li>The key will be encrypted and securely stored in our Firestore database</li>
            </ul>
          </li>
          <li>
            <strong>Using the Speech-to-Text Feature:</strong>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Click on the "Upload Audio" button</li>
              <li>Select an audio file from your device (supported formats: mp3, wav, m4a)</li>
              <li>Once uploaded, click on the "Transcribe" button</li>
              <li>Wait for the transcription process to complete</li>
              <li>View and download your transcript</li>
            </ul>
          </li>
        </ol>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HelpModal;