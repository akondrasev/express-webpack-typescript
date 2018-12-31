import * as angular from 'angular';
import authService from './auth.service';

export default angular.module("services", [
    authService
]).name;
