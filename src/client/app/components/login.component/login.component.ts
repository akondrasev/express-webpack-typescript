import * as angular from 'angular';
import './login.component.scss';
import {AuthService} from "../../services/auth.service";
import {StateProvider, StateService} from "@uirouter/angularjs";
import {Injectable, IOnInit} from "angular";

class LoginComponent implements IOnInit {
    static $inject: Array<string> = ["authService", "$state", "GAuth"];

    public email: string = "";
    public password: string = "";

    constructor(private authService: AuthService, private $state: StateService, private GAuth:any) {

    }

    $onInit() {
    }

    async googleAuth() {
        try {
            // @ts-ignore
            const auth2 = gapi.auth2.getAuthInstance();
            const user = await auth2.signIn();

            console.log(user);
            // $state.go('webapp.home'); // action after the user have validated that
            // your application can access their Google account
        } catch (e) {
            console.log('login failed', e);
        }
    }

    async googleLogout() {
        // @ts-ignore
        const auth2 = gapi.auth2.getAuthInstance();
        await auth2.signOut();

        console.log('User signed out.');
    }


    async login() {
        await this.authService.login(this.email, this.password);
        this.$state.go("chat");//TODO make default page as property
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
}]).run([async () => {

}]);

export default ngModule.name;
