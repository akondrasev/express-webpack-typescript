import * as angular from 'angular';
import './login.component.scss';
import {StateProvider, StateService, TransitionService, Transition, UrlService, HookResult} from "@uirouter/angularjs";
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

    let redirected = false;

    $transitions.onBefore({to: (state) => state.name !== "login"}, (transition: Transition):HookResult => {
        return new Promise((resolve, reject) => {
            authService.isAuthorized().then(() => {
                resolve();
            }).catch(() => {
                redirected = true;
                resolve($state.target("login"));

                transition.promise.finally(() => {
                    redirected = false;
                });
            });
        });
    });

    $transitions.onBefore({to: (state) => state.name === "login" && !redirected}, (transition: Transition):HookResult => {
        return new Promise((resolve) => {
            authService.isAuthorized().then(() => {
                resolve($state.target("chat"));
            }).catch(() => {
                resolve();
            });
        });
    });
}]);

export default ngModule.name;
