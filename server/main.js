import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    Meteor.startup(() => {
        Accounts.config({
            sendVerificationEmail: true,
            forbidClientAccountCreation: false
        });
    });
});
