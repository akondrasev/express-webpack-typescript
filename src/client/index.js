import './polyfills';
import logMessage from './js/logger';
import './ts/index';
import './css/style.css';

logMessage('A very warm welcome to Expack!');

import './main';

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
