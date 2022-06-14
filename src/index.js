import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MoralisProvider } from "react-moralis";


ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl='https://1xcfnmtjuuub.usemoralis.com:2053/server' appId='oRasKA24jcPiTUnC4qZSs4vyIgvNdJAEfVZKjbVd'>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
