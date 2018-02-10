import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';


const APP_ROOT = document.getElementById('appRoot');

ReactDOM.render(<App />, APP_ROOT);

if (module.hot) {
    module.hot.accept('./App', () => {
        let UpdatedApp = require('./App').default;
        ReactDOM.render(<UpdatedApp />, APP_ROOT);
    });
}
