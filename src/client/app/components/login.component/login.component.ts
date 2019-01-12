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

    $onInit() {
        // @ts-ignore
        gapi.signin2.render("google-id", {
            "scope": "profile email openid",
            // "width": 200,
            // "height": 40,
            "longtitle": false,
            // "theme": "dark",
            "onsuccess": function (googleUser) {
                // Called when the user signs in
                console.log(googleUser);
            },
            "onfailure": function (e) {
                console.warn("Google Sign-In failure: " + e.error);
            }
        });
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
