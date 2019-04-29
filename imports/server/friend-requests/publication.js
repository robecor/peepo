import FriendRequests from '/imports/db/friend-requests/collection.js';

Meteor.publish('friend-requests', function () {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('Must be logged in.');
  }

  return FriendRequests.find({
    to: userId
  });
});
