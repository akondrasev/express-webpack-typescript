import * as angular from 'angular';
import './login.component.scss';
import {StateProvider, TransitionService, StateService} from "@uirouter/angularjs";
import {IRootScopeService} from "angular";

const ngModule = angular.module("login", []).component("loginComponent", {
    templateUrl: './login.component.html',
    controller: [function () {

    }]
}).config(["$stateProvider", ($stateProvider: StateProvider) => {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        component: 'loginComponent'
    });
}]).run(["$rootScope", "$state", ($rootScope: IRootScopeService, $state: StateService) => {
    $state.go('login');

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

        const isLogin = toState.name === "login";
        if (isLogin) {
            return;
        }

        $state.go('login');

        // now, redirect only not authenticated

        // var userInfo = authenticationSvc.getUserInfo();

        // if(userInfo.authenticated === false) {
        //     e.preventDefault(); // stop current execution
        //     $state.go('login'); // go to login
        // }
    });
}]);

export default ngModule.name;
