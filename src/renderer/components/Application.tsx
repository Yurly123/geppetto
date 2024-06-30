import React from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';

const Application: React.FC = () => {
  return (
    <ContextsProvider>
      <div className='app'>
        <div className='box'>인공지능과 대화해보세요</div>
        <Chat />
      </div>
    </ContextsProvider>
  );
};

export default Application;
