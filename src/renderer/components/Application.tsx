import React from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Viseme from './Viseme';

const Application: React.FC = () => {
  return (
    <ContextsProvider>
      <div className='app'>
        <div className='box'>
          <Viseme />
        </div>
        <Chat />
      </div>
    </ContextsProvider>
  );
};

export default Application;
