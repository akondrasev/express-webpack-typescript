import * as angular from 'angular';
import './chat.component.scss';
import {StateProvider, StateService} from "@uirouter/angularjs";
import {AuthService} from "../../services/auth.service";
import Socket = SocketIOClient.Socket;

class ChatComponent {
    static $inject: Array<string> = ["authService", "$state", "socket"];

    private message: string = "";

    constructor(private authService: AuthService, private $state: StateService, private socket: Socket) {
        socket.on("pop", (data) => {
            console.log(data);
        });
    }

    logout() {
        this.authService.logout().then(() => {
            this.$state.go("login");
        });
    }

    submitMessage() {
        this.socket.emit("push", this.message);
        this.message = "";
    }
}

const ngModule = angular.module("chat", []).component("chatComponent", {
    templateUrl: './chat.component.html',
    controller: ChatComponent
}).config(["$stateProvider", ($stateProvider: StateProvider) => {
    $stateProvider.state({
        name: 'chat',
        url: '/chat',
        component: 'chatComponent'
    });
}]);

export default ngModule.name;
