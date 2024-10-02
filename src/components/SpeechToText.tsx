import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { functions, httpsCallable } from '../firebase';

const SpeechToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const transcriptionRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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
      const fileContent = await readFileAsArrayBuffer(file);
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
      setWordCount((result.data as string).split(/\s+/).length);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error transcribing audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as ArrayBuffer);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const copyToClipboard = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription)
        .then(() => alert('Transcription copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Speech to Text</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="audio/*,.m4a"
          className="mb-2 w-full p-2 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          disabled={!file || isLoading} 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Transcribing...' : 'Transcribe'}
        </button>
      </form>
      {transcription && (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Transcription:</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Word count: {wordCount}</span>
            <button 
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Copy to Clipboard
            </button>
          </div>
          <div 
            ref={transcriptionRef}
            className="bg-gray-100 p-4 rounded h-64 overflow-y-auto whitespace-pre-wrap"
          >
            {transcription.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      <nav>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Home</Link>
      </nav>
    </div>
  );
};

export default SpeechToText;