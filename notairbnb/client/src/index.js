import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
