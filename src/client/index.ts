import './app/index';
import './css/style.css';
import io from 'socket.io-client';

const socket = io();

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
