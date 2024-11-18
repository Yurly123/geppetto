import React from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import MenuButton from './Menu/MenuButton';

const Application: React.FC = () => {
  return (
    <ContextsProvider>
      <div className='app'>
        <MenuButton />
        <Chat />
      </div>
    </ContextsProvider>
  );
};

export default Application;
