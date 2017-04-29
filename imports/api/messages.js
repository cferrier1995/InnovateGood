import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('Messages');

//publish to client
if (Meteor.isServer){
    //only return messageChains that involve this user
    Meteor.publish('messagesByConversation', function messagePublication(participant1, participant2) {
        return Messages.find({
                $and: [
                    {$or: [
                        {receiverId: participant1},
                        {senderId: participant1}
                    ]},
                    {$or: [
                        {receiverId: participant2},
                        {senderId: participant2}
                    ]}
                ]
            },
            {
                sort: {date: -1}
            }
        );
    });
    Meteor.publish('messages', function messagePublication(){
            return Messages.find({
                    $or: [
                        {receiverId: this.userId},
                        {senderId: this.userId}
                    ]
                },
                {sort: {date: -1}}
            );
        }
    );
}

Meteor.methods({
    'messages.insert'(receiverId, receiverName, message_text){
        check(receiverId, String);
        check(receiverName, String);
        check(message_text, String);

        var senderName = Meteor.users.findOne({_id: this.userId}).username;
        //confirm user is logged in
        if (!this.userId){
            throw new Meteor.Error("logged-out",
                "The user must be logged in to send a message");
        }

        if (this.userId == receiverId){
            throw new Meteor.Error("validation-error",
                "You can't send a message to yourself");
        }

        Messages.insert({
            receiverId,
            senderName,
            receiverName,
            senderId: this.userId,
            message_text,
            date: new Date()
        });
    }
});