import { Router } from 'meteor/iron:router'
import { Meteor } from 'meteor/meteor';
import { Requests } from '../api/requests.js';
import { Messages } from '../api/messages.js';
import { Conversations } from '../api/conversations.js';

import '../api/profiles.js';

import '../ui/home.js';
import '../ui/new_request.js';
import '../ui/header.js';
import '../ui/profile.js'
import '../ui/requests.js'
import '../ui/message.js';
import '../ui/messages.js';
import '../ui/conversation.js'

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

Router.route('requests/:_userId', {
    path: 'requests/:_userId',
    waitOn: function () {
        return Meteor.subscribe('requestsByUser', this.params._userId);
    },
    data: function() {
        return {
            requests: Requests.find({publisherId: this.params._userId})
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'requests'
});

Router.route('profile/:_id', {
    path: 'profile/:_id',
    waitOn: function () {
        return Meteor.subscribe('userData', this.params._id);
    },
    data: function() {
        return Meteor.users.findOne({_id: this.params._id});
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'profile'
});

Router.route('messages', {
    path: 'messages',
    waitOn: function () {
        return Meteor.subscribe('conversations');
    },

    layoutTemplate: 'ApplicationLayout',
    template: 'messages'
});

Router.route('conversation/:_id', {
    path: 'conversation/:_id',
    waitOn: function () {
        return [
            Meteor.subscribe('messages'),
            Meteor.subscribe('conversations', this.params._id)
        ]
    },
    data: function(){
        return {
            conversation: Conversations.findOne({_id: this.params._id}),
            messages: Messages.find()
        }
    },
    layoutTemplate: 'ApplicationLayout',
    template: 'conversation'
});