import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/requests';

Meteor.startup(() => {
    Meteor.startup(() => {
        Accounts.config({
            sendVerificationEmail: true,
            forbidClientAccountCreation: false
        });
    });
});
