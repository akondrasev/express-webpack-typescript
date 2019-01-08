import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import 'angular-messages';
import '@uirouter/angularjs';
import {ICompileProvider, ILocationProvider} from "angular";
import ngConstants from './constants/index';
import viewComponents from "./components/index";
import services from './services/index';

const requires: Array<string> = [
    ngMaterial,
    "ui.router",
    viewComponents,
    "ngMessages",
    services,
    ngConstants
];

angular.module("app", requires).config(["$compileProvider", "$locationProvider", "$mdThemingProvider", ($compileProvider: ICompileProvider, $locationProvider: ILocationProvider, $mdThemingProvider: angular.material.IThemingProvider) => {

    // @ts-ignore
    if (compile.isProduction) {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.hashPrefix("");
    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');
}]);



