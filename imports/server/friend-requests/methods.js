import FriendRequests from '/imports/db/friend-requests/collection.js';

Meteor.methods({
  sendFriendRequest({username}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const user = Meteor.users.findOne({_id: userId});
    const toUser = Meteor.users.findOne({username});

    if (user.friends && user.friends.includes(toUser._id)) {
      throw new Meteor.Error('Already friends.');
    }

    FriendRequests.insert({
      from: userId,
      to: toUser._id,
      fromUsername: user.username,
      toUsername: toUser.username
    });
  },

  acceptFriendRequest({username}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const toUser = Meteor.users.findOne({username});
    const request = FriendRequests.findOne({
      from: toUser._id,
      to: userId
    });

    if (!request) {
      throw new Meteor.Error('No request found.');
    }

    Meteor.users.update({_id: userId}, {
      $addToSet: {
        friends: toUser._id
      }
    });

    Meteor.users.update({_id: toUser._id}, {
      $addToSet: {
        friends: userId
      }
    });

    FriendRequests.remove({_id: request._id});
  },

  declineFriendRequest({username}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const toUser = Meteor.users.findOne({username});
    const request = FriendRequests.findOne({
      from: toUser._id,
      to: userId
    });

    if (!request) {
      throw new Meteor.Error('No request found.');
    }

    FriendRequests.remove({_id: request._id});
  },

  removeFriend({username}) {
    const userId = this.userId;

    if (!userId) {
      throw new Meteor.Error('Must be logged in!');
    }

    const toUser = Meteor.users.findOne({username});

    Meteor.users.update({_id: userId}, {
      $pull: {
        friends: toUser._id
      }
    });

    Meteor.users.update({_id: toUser._id}, {
      $pull: {
        friends: userId
      }
    });
  }
});