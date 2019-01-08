import * as angular from 'angular';
import socket from './socket';

const ngModule = angular.module("constValues", [
    socket
]);

export default ngModule.name;