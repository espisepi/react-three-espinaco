import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './navigation/AppRouter';
import { App0, App1, App2, App3, App4, App5, App6, App7 } from './App';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

