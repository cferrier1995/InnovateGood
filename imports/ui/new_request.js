import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../api/requests.js';
import { ReactiveVar } from 'meteor/reactive-var'

import './new_request.html';

Template.new_request.events({
    'submit .new-request'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form elements
        const target = event.target;
        const name = target.name.value;
        const description = target.description.value;
        const urgency = Number(target.urgency.value);

        if (!name){
            Session.set("errorMessage", "Request must have a name");
        }
        else if (!description){
            Session.set("errorMessage", "Request must have a description");
        }
        else if (!urgency){
            Session.set("errorMessage", "Request must have an urgency (1-5)");
        }
        else
        {
            console.log("here");
            // Insert a listing into the collection
            Meteor.call('requests.insert', name, urgency, description, function(error, result){
                if (error && error.error === "logged_out") {
                    // show a nice error message
                    Session.set("errorMessage", "Please log in to post a listing.");
                }
                else if (error && error.error === "empty_name") {
                    Session.set("errorMessage", "Request must have a name");
                }
                else if (error && error.error === "empty_desc") {
                    Session.set("errorMessage", "Request must have a description");
                }
                else
                {
                    Session.set("errorMessage", null);
                    Router.go('home');
                }
            });
        }


    }
});/**
 * Created by cferrier on 4/29/2017.
 */
