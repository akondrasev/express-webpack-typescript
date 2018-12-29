import * as angular from 'angular';
import './login.component.scss';
import {StateProvider} from "@uirouter/angularjs";

const ngModule = angular.module("login", []).component("loginComponent", {
    templateUrl: './login.component.html',
    controller: [function () {

    }]
}).config(["$stateProvider", ($stateProvider:StateProvider) => {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        component: 'loginComponent'
    });
}]);

export default ngModule.name;
