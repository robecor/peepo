import FriendRequests from '/imports/db/friend-requests/collection.js';

Meteor.methods({
  sendFriendRequest({toUserId}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const user = Meteor.users.findOne({_id: userId});

    FriendRequests.insert({
      from: userId,
      to: toUserId,
      username: user.username
    });
  },

  acceptFriendRequest({toUserId}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const request = FriendRequests.findOne({
      from: toUserId,
      to: userId
    });

    if (!request) {
      throw new Meteor.Error('No request found.');
    }

    Meteor.users.update({_id: userId}, {
      $addToSet: {
        friends: toUserId
      }
    });

    Meteor.users.update({_id: toUserId}, {
      $addToSet: {
        friends: userId
      }
    });

    FriendRequests.remove({_id: request._id});
  },

  declineFriendRequest({toUserId}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const request = FriendRequests.findOne({
      from: toUserId,
      to: userId
    });

    if (!request) {
      throw new Meteor.Error('No request found.');
    }

    FriendRequests.remove({_id: request._id});
  },
});