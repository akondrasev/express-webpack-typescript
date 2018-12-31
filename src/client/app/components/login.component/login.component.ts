import * as angular from 'angular';
import './login.component.scss';
import {StateProvider, StateService, TransitionService, Transition, UrlService} from "@uirouter/angularjs";
import {IRootScopeService} from "angular";
import {AuthService} from "../../services/auth.service";

class LoginComponent {
    static $inject: Array<string> = ["authService", "$state"];

    public email: string = "";
    public password: string = "";

    constructor(private authService: AuthService, private $state: StateService) {

    }

    login() {
        this.authService.login(this.email, this.password).then(() => {
            this.$state.go("chat")
        });
    }
}

const ngModule = angular.module("login", []).component("loginComponent", {
    templateUrl: './login.component.html',
    controller: LoginComponent
}).config(["$stateProvider", ($stateProvider: StateProvider) => {
    $stateProvider.state({
        name: 'login',
        url: '/login',
        component: 'loginComponent'
    });
}]).run(["$rootScope", "$state", "$transitions", "$urlService", "authService", ($rootScope: IRootScopeService, $state: StateService, $transitions: TransitionService, $urlService: UrlService, authService: AuthService) => {
    $urlService.rules.otherwise("/chat");

    $transitions.onBefore({to: "*"}, (transition: Transition) => {
        if (transition.to().name === "login" && !authService.isAuthorized()) {
            return;
        }

        if (authService.isAuthorized() && transition.to().name === "login") {
            return $state.target("chat");
        }

        if (!authService.isAuthorized()) {
            return $state.target("login");
        }
    });
}]);

export default ngModule.name;
