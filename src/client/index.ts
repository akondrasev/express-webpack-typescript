import './app/index';
import './css/style.css';
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

const socket:Socket = io({
    autoConnect: false
});

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
    module.hot.accept();
}
