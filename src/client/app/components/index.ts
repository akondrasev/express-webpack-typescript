import * as angular from 'angular';
import loginComponent from './login.component/login.component';
import chatComponent from './chat.component/chat.component';

export default angular.module("viewComponents", [
    loginComponent, chatComponent
]).name;
