import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import '../ui/home.js';
import '../ui/ApplicationLayout.html';

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('home', {
    path: '/'
});