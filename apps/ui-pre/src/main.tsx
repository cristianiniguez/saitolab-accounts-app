import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import AppProvider from './components/providers/AppProvider';
import MessagesProvider from './components/providers/MessagesProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MessagesProvider>
      <AppProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AppProvider>
    </MessagesProvider>
  </React.StrictMode>,
);
