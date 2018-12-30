import * as angular from 'angular';
import './login.component.scss';
import {StateProvider, StateService, TransitionService, Transition, UrlService} from "@uirouter/angularjs";
import {IRootScopeService} from "angular";
import IInjectorService = angular.auto.IInjectorService;

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
}]).run(["$rootScope", "$state", "$transitions", "$urlService", ($rootScope: IRootScopeService, $state: StateService, $transitions: TransitionService, $urlService: UrlService) => {
    $urlService.rules.otherwise("/login");

    $transitions.onStart({from: "*", to: "*"}, (transition: Transition) => {
        if (transition.to().name === "login") {
            return;
        }

        transition.redirect($state.target("login"));
    });
}]);

export default ngModule.name;
