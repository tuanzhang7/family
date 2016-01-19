'use strict';

var mongoose = require('mongoose');

var FamilySchema = new mongoose.Schema({
  id: String,
  email:{ type: String, required: true },
  members: [{name: { type: String, required: true }}],
  helpers: [{name: { type: String, required: true }}],
  events: [
    {
      event: { type: String, required: true },
      timeStart: Date,
      timeEnd: Date
    }
  ],
  adhocJobs: [
    {
      job: { type: String, required: true },
      sendTime: Date,
      status: String
    }
  ],
  chats: [
    {
      message: { type: String, required: true },
      sender: String,
      sendTime: Date
    }
  ],
  predefined: [
    {
      messages: [
        {
          message:String
        }
      ]
    }]
});

export default mongoose.model('Family', FamilySchema);
