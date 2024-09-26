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
    <div>
      <h2>Speech to Text</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="audio/*" />
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </form>
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
};

export default SpeechToText;