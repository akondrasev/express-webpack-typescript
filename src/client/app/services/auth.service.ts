import * as angular from 'angular';
import {IHttpService} from "angular";

const ngModule = angular.module("auth", []);

export class AuthService {
    static $inject:Array<string> = ["$http"];

    constructor(private $http: IHttpService) {
    }

    isAuthorized() {
        return this.$http.get(`/api/auth/login`);
    }

    login(email:string, password:string) {
        return this.$http.post(`/api/auth/login`, {
            email, password
        });
    }

    logout() {
        return this.$http.post(`/api/auth/logout`, null);
    }

}

ngModule.service("authService", AuthService);

export default ngModule.name;
