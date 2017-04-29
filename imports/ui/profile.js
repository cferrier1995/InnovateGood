import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './message.js'
import './profile.html';


Template.profile.helpers({
    messageBox (){
        return Template.instance().messageBox;
    },
    getEmail() {
        return this.emails[0].address;
    },
    differentUser(){
        return Meteor.userId() != this._id;
    }
});

Template.profile.events({
    'click .viewRequests': function () {
        Router.go('requests/:_userId', {_userId: this._id});
    },
    'submit .new-message' (event){

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const message_text = target.message_text.value;

        const receiverId = this._id;
        const receiverName = this.username;
        console.log(message_text);
        console.log(receiverId);
        console.log(receiverName);

        // Insert a message into the collection
        Meteor.call('messages.insert', receiverId, receiverName, message_text, function(error){
            if (error) {
                if(error.error === "logged-out")
                // show a nice error message
                    Session.set("errorMessage", "Please log in to send a message.");
                else
                    Session.set("errorMessage","Unknown error");
            }
            else {
                target.message_text.value = " ";
            }
        });

        Meteor.call('conversations.insert', receiverId, receiverName, function(error){
            if (error) {
                if(error.error === "logged-out")
                // show a nice error message
                    Session.set("errorMessage", "Please log in to send a message.");
                else
                    Session.set("errorMessage","Unknown error");
            }
        });

        Router.go('home');
    },
});