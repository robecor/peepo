Meteor.publish('friends', function () {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('Must be logged in.');
  }

  const user = Meteor.users.findOne({_id: userId});

  return Meteor.users.find({
    _id: {
      $in: user.friends || []
    }
  }, {
    fields: {
      username: 1
    }
  });
});
