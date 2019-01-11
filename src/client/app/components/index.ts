import * as angular from 'angular';
import loginComponent from './login.component/login.component';
import chatComponent from './chat.component/chat.component';
import error404Component from './error404.component/error404.component'
import {IRootScopeService} from "angular";
import {AuthService} from "../services/auth.service";
import {StateService, TransitionService, Transition, UrlService, HookResult, UrlParts, UIRouter, UrlRule} from "@uirouter/angularjs";


export default angular.module("viewComponents", [
    loginComponent, chatComponent, error404Component
]).run(["$rootScope", "$state", "$transitions", "$urlService", "authService", ($rootScope: IRootScopeService, $state: StateService, $transitions: TransitionService, $urlService: UrlService, authService: AuthService) => {
    $urlService.rules.otherwise((matchValue?: any, url?: UrlParts, router?: UIRouter) => {
        if (url.path === "/") {
            return {
                state: "chat"
            };
        }

        return {
            state: "error404"
        };
    });

    let redirected = false;

    $transitions.onBefore({to: (state) => state.name !== "login" && state.name !== "error404"}, (transition: Transition):HookResult => {
        return new Promise((resolve, reject) => {
            authService.isAuthorized().then(() => {
                resolve();
            }).catch(() => {
                redirected = true;
                resolve($state.target("login"));
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

    $transitions.onSuccess({to: "login"}, () => {
        redirected = false;
    });

    $transitions.onError({to: "*"}, () => {
        console.log("error");
    })

}]).name;
