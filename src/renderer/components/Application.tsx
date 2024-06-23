import React, { useEffect } from 'react';
import '@styles/app.scss';
import Chat from './Chat';

const Application: React.FC = () => {
  return (
    <div className='app'>
      <div className='box'>안녕</div>
      <Chat />
    </div>
  );
};

export default Application;
