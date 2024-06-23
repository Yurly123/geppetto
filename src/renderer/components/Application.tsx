import React, { useEffect } from 'react';
import '@styles/app.scss';
import Chat from './Chat';

const Application: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');

  async function getCompletion(prompt: string) {
    const response = await window.openai.completion(prompt);
    setMessage(response);
  }

  useEffect(() => { getCompletion('안녕?') }, [])

  return (
    <div className='app'>
      <div className='box'>{message}</div>
      <Chat />
    </div>
  );
};

export default Application;
