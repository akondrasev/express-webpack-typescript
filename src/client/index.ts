import {bootstrap} from 'angular';
import 'cookieconsent';
import 'cookieconsent/build/cookieconsent.min.css';
import './style.scss';

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

// @ts-ignore
gapi.load('auth2', async function() {
    // @ts-ignore
    gapi.auth2.init({
        client_id: "254895727822-mhgm2s8g2rvvgio9rk4en99unsk37o00.apps.googleusercontent.com"
    });

    // @ts-ignore
    await import('./app/index');

    bootstrap(document.getElementsByTagName("html")[0], ["app"]);
});

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
