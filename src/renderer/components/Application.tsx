import React from 'react';
import '@styles/app.scss';
import Chat from './Chat';

const Application: React.FC = () => {
  return (
    <div className='app'>
      <div className='box'>안녕, 세상아!</div>
      <Chat />
    </div>
  );
};

export default Application;
