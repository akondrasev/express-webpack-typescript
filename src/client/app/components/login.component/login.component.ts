import * as angular from 'angular';
// @ts-ignore
import template from './login.component.html';

const ngModule = angular.module("login", []).component("loginComponent", {
    template: template,
    controller: function () {
        console.log("login component");
    }
});
export default ngModule.name;
