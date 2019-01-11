import * as angular from 'angular';
import './login.component.scss';
import {AuthService} from "../../services/auth.service";
import {StateProvider, StateService} from "@uirouter/angularjs";

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
}]);

export default ngModule.name;
