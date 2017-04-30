import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Requests = new Mongo.Collection('Requests');

//publish to client
if (Meteor.isServer){
    Meteor.publish('requests', function requestPublication(){
            var res = Requests.find({},{sort: {date: -1}});
            return res;
        }
    );

    Meteor.publish('request', function requestPublication(requestId){
            return Requests.find({_id: requestId});
        }
    );

    Meteor.publish('requestsByUser', function requestPublication(userId){
            return Requests.find({publisherId: userId},{sort: {urgency: -1}});
        }
    );

    Meteor.publish('requestById', function requestPublicationById(){
        var res = Requests.find({},{sort: {date: -1}});
        return res;
    })
}

Meteor.methods({
    'requests.insert'(name, urgency, description){
        check(name, String);
        check(urgency, Number);
        check(description, String);

        if (!this.userId){
            //confirm user is logged in
            throw new Meteor.Error("logged-out",
                "The user must be logged in to post a listing");
        }

        if (name == ''){
            throw new Meteor.Error("empty_name",
                "Must include a name.");
        }

        if (description == ''){
            throw new Meteor.Error("empty_description",
                "Must include a description.");
        }

        var requestId = Requests.insert({
            name: name,
            date: new Date(),
            publisherId: this.userId,
            publisherName: Meteor.users.findOne(this.userId).username,
            urgency: urgency,
            description: description,
            status: 0,
            donorID: null,
        });

        console.log (requestId);
        return requestId;
    },

    'requests.fulfill'(reqId){
        check(reqId, String);

       // var request = Requests.findOne({_id: reqId});

        Requests.update(reqId, {
            $set: { status: 1,
                    donorID: this.userId
            }});
    },

    'requests.accept'(reqId){
        check(reqId, String);

        Requests.update(reqId, {
            $set: { status: 2,
                    donorID: this.userId
            }});
    },

    'requests.decline'(reqId){
        check(reqId, String);

        Requests.update(reqId, {
            $set: { status: 0,
                    donorID: null
            }});
    },
    'requests.remove'(reqId){
        check(reqId, String);

        Requests.update(reqId, {
            $set: { status: 3,
                    donorID: null
            }});
    },

});