import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import '@uirouter/angularjs';
import {ICompileProvider} from "angular";


angular.module("app", [ngMaterial, "ui-router"]).config(["$compileProvider", ($compileProvider:ICompileProvider) => {
    $compileProvider.debugInfoEnabled(false);
}]).run([() => {

}]);

