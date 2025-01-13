import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateContextProvider } from './context'; // Adjust the path if necessary

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
