import * as angular from 'angular';

const ngModule = angular.module("login", []).component("loginComponent", {
    templateUrl: './login.component.html',
    controller: function () {
        console.log("login component");
    }
});
export default ngModule.name;
