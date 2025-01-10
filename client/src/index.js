import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from './GlobalSocket/Socket'; // Path to your SocketProvider
import App from './App';

ReactDOM.render(
  <SocketProvider>
    <Router>
      <App />
    </Router>
  </SocketProvider>,
  document.getElementById('root')
);
