/**
 * Created by cferrier on 4/29/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './ApplicationLayout.html'

Template.header.events({
    'click .new_request': function (event) {
        event.preventDefault();
        Router.go('new_request/:_id', {_id: Meteor.userId});
    },
    'click .viewProfile': function (event) {
        event.preventDefault();
        Router.go('profile/:_id', {_id: Meteor.userId});
    },
    'click .viewMessages': function (event) {
        event.preventDefault();
        Router.go('messages');
    }
});