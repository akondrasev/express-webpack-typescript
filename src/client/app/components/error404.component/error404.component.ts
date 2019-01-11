import * as angular from 'angular';
import './error404.component.scss';
import {StateProvider, StateService} from "@uirouter/angularjs";

class Error404Component {
    static $inject: Array<string> = [];

    constructor() {

    }
}

const ngModule = angular.module("error404", []).component("error404Component", {
    templateUrl: './error404.component.html',
    controller: Error404Component
}).config(["$stateProvider", ($stateProvider: StateProvider) => {
    $stateProvider.state({
        name: 'error404',
        component: 'error404Component'
    });
}]);

export default ngModule.name;
