import CallRequests from '/imports/db/call-requests/collection.js';

Meteor.methods({
  callUser({username, peerId}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const user = Meteor.users.findOne({_id: userId});
    const toUser = Meteor.users.findOne({username});

    const existingRequest = CallRequests.findOne({
      from: userId,
      to: toUser._id,
    });

    if (existingRequest) {
      throw new Meteor.Error('Already calling');
    }

    CallRequests.insert({
      from: userId,
      to: toUser._id,
      fromUsername: user.username,
      toUsername: toUser.username,
      peerId
    });
  },

  removeCallRequest({requestId}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    CallRequests.remove({_id: requestId});
  }
});
