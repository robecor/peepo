Meteor.publish('friends', function () {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('Must be logged in.');
  }

  return Meteor.users.find({
    friends: userId
  }, {
    fields: {
      username: 1
    }
  });
});
