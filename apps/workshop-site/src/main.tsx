import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './workshop-app';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
