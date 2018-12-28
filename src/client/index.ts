import './css/style.css';
import './polyfills';
import './main';

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
