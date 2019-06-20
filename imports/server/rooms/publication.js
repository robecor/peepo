import Rooms from '/imports/db/rooms/collection.js';

Meteor.publish('room-participants', function ({roomId}) {
  const userId = this.userId;

  if (!userId) {
    throw new Meteor.Error('Must be logged in.');
  }

  return Rooms.find({
    _id: roomId
  });
});
