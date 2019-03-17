import './app/index';
import 'cookieconsent';
import 'cookieconsent/build/cookieconsent.min.css';
import './css/style.css';
import './polyfills';
import './main';

// @ts-ignore
window.cookieconsent.initialise({
    "palette": {
        "popup": {
            "background": "#383b75"
        },
        "button": {
            "background": "#f1d600"
        }
    },
    "position": "bottom-right"
});

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
