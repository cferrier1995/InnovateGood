import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Requests } from '../api/requests';

import './home.html';

Template.home.helpers({
  hasRequests(){
    console.log(this.requests.count());
    return (this.requests.count() > 0);
  },
  format(date){
    return date.ToDateString();
  }
});