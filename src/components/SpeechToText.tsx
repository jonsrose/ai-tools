import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { functions, httpsCallable } from '../firebase';

const SpeechToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const fileContent = event.target.result as ArrayBuffer;
          const base64 = btoa(
            new Uint8Array(fileContent).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          const speechToText = httpsCallable(functions, 'speechToText');
          const result = await speechToText({ 
            fileName: file.name,
            fileContent: base64
          });

          setTranscription(result.data as string);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error transcribing audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Speech to Text</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" onChange={handleFileChange} accept="audio/*" className="mb-2" />
        <button type="submit" disabled={!file || isLoading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
          {isLoading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </form>
      {transcription && (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Transcription:</h3>
          <p className="bg-gray-100 p-4 rounded">{transcription}</p>
        </div>
      )}
      <nav>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Home</Link>
      </nav>
    </div>
  );
};

export default SpeechToText;