import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Conversations } from '../api/conversations.js';

import './messages.html';

Template.messages.helpers({
    conversations() {
        var results = Conversations.find();
        if (results.count() == 0){
            return 0;
        }
        else
        {
            return results;
        }
    },
    otherGuy() {
        if (this.senderId == Meteor.userId()){
            return this.receiverName;
        } else {
            return this.senderName;
        }
    }
});

Template.messages.events({
    'click .conversation': function () {
        Router.go('conversation/:_id', {_id:this._id});
    },
    'click .viewSenderProfile': function () {
        Router.go('profile/:_id', {_id:this.senderId});
    },
    'click .viewReceiverProfile': function () {
        Router.go('profile/:_id', {_id: this.receiverId});
    }
});