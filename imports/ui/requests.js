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
  },
  statusName(){
  	console.log("You seeing these rq's")
  	if(this.status == 0)
  		return "Requested";
  	if(this.status == 1)
  		return "Pending";
  	if(this.status == 2)
  		return "Delivered";
  	if(this.status == 3)
  		return "Canceled";
  },
  isPublisher(){
	  if(this.publisherId == Meteor.userId()){
	  	return true;
	  }
	  else {
	  	return false;
	  }
  },  
  isRequested(){
  	return this.status == 0;
  },
  isPending(){
  	return this.status == 1;
  },
  isDeliverd(){
  	return this.status == 2;
  },
  isCanceled(){
  	return this.status == 3;
  }

});

Template.requests.events({
 'click .fulfill': function () {
 	Meteor.call('requests.fulfill', this._id);
 },
  'click .accept': function () {
 	Meteor.call('requests.accept', this._id);
 },
  'click .decline': function () {
 	Meteor.call('requests.decline', this._id);
 },
   'click .remove': function () {
 	Meteor.call('requests.remove', this._id);
 }

});