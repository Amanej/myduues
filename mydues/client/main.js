import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

Template.calendar.onCreated(function helloOnCreated() {

});

Template.calendar.helpers({

});

Template.calendar.events({
  'click td'(evt, ins) {
    /*console.log(evt);
    console.dir(ins);*/
    console.log("Date: "+evt.target.dataset.date);
    Session.set("dateChosen",evt.target.dataset.date);
    $(".todaysDue").show();
    $(".myCalendar").hide();
  },
});

Template.todoDate.helpers({
 dues() {
   _dues = ToDues.find({date: Session.get("dateChosen")}).fetch();
   //console.log(_dues);
   return _dues
 },
 date() {
   _myDate = moment(Session.get("dateChosen"));
   return _myDate.format("D MMMM YY");
 }
})

Template.todoDate.events({
  'click .backToCalendar'(evt,ins) {
    $(".myCalendar").show();
    $(".todaysDue").hide();
    Session.set("dateChosen",null);
  },
  'submit .addDueForm'(evt,ins) {
    evt.preventDefault();
    console.log(evt);
    console.log(evt.target.addDue.value);
    _date = Session.get("dateChosen");
    _text = evt.target.addDue.value;
    ToDues.insert({
      'category': null,
      'date': _date,
      'status': false,
      'text': _text
    });
    $(".addDue").val("");
  }
});
