import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Requests } from '../api/requests';

import './requests.html';

Template.requests.helpers({
  hasRequests(){
    console.log(this.requests.count());
    return (this.requests.count() > 0);
  },
  format(date){
    return date.ToDateString();
  }
});