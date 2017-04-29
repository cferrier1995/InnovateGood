import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.profile.helpers({
    getEmail() {
        return this.emails[0].address;
    }
});

Template.profile.events({
    'click .viewRequests': function () {
        Router.go('requests/:_userId', {_userId: this._id});
    }
});