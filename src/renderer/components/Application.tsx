import React from 'react';
import '@styles/app.scss';
import Chat from './Chat';
import { ContextsProvider } from './contexts';

const Application: React.FC = () => {
  return (
    <div className='app'>
      <ContextsProvider>
        <div className='box'>인공지능과 대화해보세요</div>
        <Chat />
      </ContextsProvider>
    </div>
  );
};

export default Application;
