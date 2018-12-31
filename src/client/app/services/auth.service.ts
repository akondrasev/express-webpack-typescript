import * as angular from 'angular';
import {IQService, ITimeoutService} from "angular";

const ngModule = angular.module("auth", []);
const storageKey = "user";

interface IUser {
    email:string,
    password:string
}

export class AuthService {
    static $inject:Array<string> = ["$q", "$timeout"];

    private user:IUser = null;

    constructor(private $q:IQService, private $timeout: ITimeoutService) {
        this.user = JSON.parse(localStorage.getItem(storageKey));
    }

    isAuthorized() {
        return this.user !== null;
    }

    login(email:string, password:string) {
        return this.$q((resolve, reject) => {
            this.$timeout(() => {
                this.user = {email: email, password: password};

                localStorage.setItem(storageKey, JSON.stringify(this.user));

                resolve();
            }, 250);
        });
    }

    logout() {
        return this.$q((resolve, reject) => {
            localStorage.removeItem(storageKey);
            this.user = null;
            resolve();
        });
    }

}

ngModule.service("authService", AuthService);

export default ngModule.name;
