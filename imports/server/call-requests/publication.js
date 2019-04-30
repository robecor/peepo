import CallRequests from '/imports/db/call-requests/collection.js';

Meteor.publish('call-requests', function () {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('Must be logged in.');
  }

  return CallRequests.find({
    $or: [
      {
        to: userId
      },
      {
        from: userId
      }
    ]
  });
});
