import React, { useState } from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Menu, { MenuButton } from './Menu';

const Application: React.FC = () => {
  const [menuEnable, setMenuEnable] = useState(false)

  return (
    <ContextsProvider>
      <div className='app'>
        <h1>asdfasdf</h1>
        <Chat enable={!menuEnable} />
        {menuEnable && <Menu />}
        <MenuButton onClick={() => setMenuEnable(!menuEnable)} />
      </div>
    </ContextsProvider>
  );
};

export default Application;
