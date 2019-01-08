import * as angular from 'angular';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

const socket: Socket = io({
    autoConnect: false,
    secure: true
});


export default angular.module("socketValue", []).constant("socket", socket).run(() => {
    socket.connect();
}).name;