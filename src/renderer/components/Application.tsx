import React, { useEffect, useState } from 'react';
import '@styles/app.scss';

const Application: React.FC = () => {
  return (
    <div className='app'>
      <div className='box'>Hello, World!</div>
      <div className='box'>안녕, 세상아!</div>
      <input type='text' className='chat' placeholder='Type message' />
    </div>
  );
};

export default Application;
