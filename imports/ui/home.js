import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Requests } from '../api/requests';

import './home.html';

Template.home.events({
  'click .viewProfile': function () {
    console.log(this)
    Router.go('profile/:_id', {_id:this.id});
  },
  'click .viewRequests': function () {
    Router.go('requests/:_userId', {_userId:this.id});
  },
});


Template.home.helpers({
  requestBundles() {
    var requestBundles = [];
    var lastId = 0;
    var i = -1;
    this.requests.forEach(function(request){
      console.log(request);
      if (request.publisherId != lastId){
        requestBundles.push({
          name: request.publisherName,
          id: request.publisherId,
          count: 1,
          requests: [request]
        });
        lastId = request.publisherId;
        i++;
      }
      else
      {
        requestBundles[i].count++;
        requestBundles[i].requests.push(request);
      }
    });

    return requestBundles;
  },
  hasRequests(){
    console.log(this.requests.count());
    return (this.requests.count() > 0);
  },
  format(date){
    return date.ToDateString();
  }
});