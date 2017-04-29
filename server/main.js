import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/requests';
import '../imports/api/profiles';
import '../imports/api/messages';
import '../imports/api/conversations';


Meteor.startup(() => {
    Meteor.startup(() => {
        Accounts.config({
            sendVerificationEmail: true,
            forbidClientAccountCreation: false
        });
    });
});
