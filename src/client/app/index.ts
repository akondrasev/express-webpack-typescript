import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import 'angular-messages';
import '@uirouter/angularjs';
import {ICompileProvider, ILocationProvider} from "angular";
import viewComponents from "./components/index";

angular.module("app", [ngMaterial, "ui.router", viewComponents, "ngMessages"])
    .config(["$compileProvider", "$locationProvider", ($compileProvider: ICompileProvider, $locationProvider: ILocationProvider) => {
            // @ts-ignore
            if (compile.isProduction) {
                $compileProvider.debugInfoEnabled(false);
            }

            $locationProvider.hashPrefix("");
            $locationProvider.html5Mode(true);
        }]
    );



