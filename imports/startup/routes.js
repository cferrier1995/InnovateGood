import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import { Requests } from '../api/requests.js';

import '../ui/home.js';
import '../ui/new_request.js';
import '../ui/header.js';

import '../ui/ApplicationLayout.html';

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('home', {
    path: '/',
    waitOn: function () {
        return Meteor.subscribe('requests');
    },
    data: function (){
        return {
            requests: Requests.find()
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'home'
});

Router.route('new_request/:_id', {
    path: 'new_request/:_id',
    layoutTemplate: 'ApplicationLayout',
    template: 'new_request'
});