import * as angular from 'angular';
import './login.component.scss';
import {AuthService} from "../../services/auth.service";
import {StateProvider, StateService} from "@uirouter/angularjs";

class LoginComponent {
    static $inject: Array<string> = ["authService", "$state", "GAuth"];

    public email: string = "";
    public password: string = "";

    constructor(private authService: AuthService, private $state: StateService, private GAuth:any) {

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

    googleAuth() {
        this.GAuth.login().then(function(user) {
            console.log(user.name + ' is logged in');
            // $state.go('webapp.home'); // action after the user have validated that
            // your application can access their Google account
        }, function() {
            console.log('login failed');
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
}]).run(['GApi', 'GAuth', 'GData', (GApi, GAuth, GData) => {
    console.log(GApi, GAuth, GData);

    var CLIENT = 'yourGoogleAuthAPIKey';
    var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

    // GApi.load('myApiName','v1',BASE);
    // GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/)

    // GAuth.setClient(CLIENT)
    // default scope is only https://www.googleapis.com/auth/userinfo.email
    // GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly');

    // load the auth api so that it doesn't have to be loaded asynchronously
    // when the user clicks the 'login' button.
    // That would lead to popup blockers blocking the auth window
    // GAuth.load();

    // or just call checkAuth, which in turn does load the oauth api.
    // if you do that, GAuth.load(); is unnecessary
    GAuth.checkAuth().then(
        function (user) {
            console.log(user.name + ' is logged in');
            // $state.go('webapp.home'); // an example of action if it's possible to
            // authenticate user at startup of the application
        },
        function() {
            // $state.go('login'); // an example of action if it's impossible to
            // authenticate user at startup of the application
        }
    );
}]);

export default ngModule.name;
