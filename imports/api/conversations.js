import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Conversations = new Mongo.Collection('Conversations');

//publish to client
if (Meteor.isServer) {
    //only return messageChains that involve this user

    Meteor.publish('conversations', function conversationPublication() {
            var toReturn = Conversations.find({
                    $or: [
                        {receiverId: this.userId},
                        {senderId: this.userId}
                    ]
                },
            );

            return toReturn;
        }
    );
}
Meteor.methods({
    'conversations.insert'(receiverId, receiverName){
        check(receiverId, String);
        check(receiverName, String);

        var count = Conversations.find({
            "receiverId": receiverId,
            "senderId": this.userId
        }).count();

        if (count <= 0) {

            var senderName = Meteor.users.findOne({_id: this.userId}).username;

            if (Meteor.isServer) {
                //if the client gave us bad data for the recievers name
                if (Meteor.users.findOne({_id: receiverId}).username != receiverName) {
                    throw new Meteor.Error("validation-error",
                        "You're sending a message to a user that dosen't exist");
                }
            }

            //confirm user is logged in
            if (!this.userId) {
                throw new Meteor.Error("logged-out",
                    "The user must be logged in to send a message");
            }

            if (this.userId == receiverId) {
                throw new Meteor.Error("validation-error",
                    "You can't send a message to yourself");
            }

            var id = Conversations.insert({
                receiverId,
                senderName,
                receiverName,
                senderId: this.userId
            });
        }
    }
});