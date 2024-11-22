import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@renderer/window/WindowFrame';
import Application from '@components/Application';
import { setAppElement } from 'react-modal';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <WindowFrame title='Geppetto' platform='windows'>
    <Application />
  </WindowFrame>
);

// Render application in DOM
const appElement = document.getElementById('app');
createRoot(appElement).render(app);
setAppElement(appElement);
