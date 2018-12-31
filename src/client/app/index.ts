import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import 'angular-messages';
import '@uirouter/angularjs';
import {ICompileProvider, ILocationProvider} from "angular";
import viewComponents from "./components/index";
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import services from './services/index';

const socket: Socket = io({
    autoConnect: false,
    secure: true
});

const requires:Array<string> = [
    ngMaterial,
    "ui.router",
    viewComponents,
    "ngMessages",
    services
];

angular.module("app", requires).config(["$compileProvider", "$locationProvider", ($compileProvider: ICompileProvider, $locationProvider: ILocationProvider) => {
    // @ts-ignore
    if (compile.isProduction) {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.hashPrefix("");
    $locationProvider.html5Mode(true);
}]).run([() => {
    socket.connect();
}]);



