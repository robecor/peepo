import Rooms from '/imports/db/rooms/collection.js';

Meteor.methods({
  createRoom({peerId}) {
    check(peerId, String);

    const roomId = Rooms.insert({
      participants: [
        {
          userId: this.userId,
          peerId
        }
      ]
    });

    return roomId;
  },

  joinRoom({roomId, peerId}) {
    check(roomId, String);
    check(peerId, String);

    const room = Rooms.findOne(roomId);

    if (!room) {
      throw new Meteor.Error('No room found!');
    }

    const foundParticipant = room.participants.find(part => part.userId === this.userId);

    if (foundParticipant) {
      return;
    }

    Rooms.update(roomId, {
      $push: {
        participants: {
          userId: this.userId,
          peerId: peerId
        }
      }
    })
  },

  leaveRoom({roomId, peerId}) {
    check(roomId, String);
    check(peerId, String);

    const room = Rooms.findOne(roomId);

    if (!room) {
      throw new Meteor.Error('No room found!');
    }

    const foundParticipant = room.participants.find(part => part.userId === this.userId);

    if (!foundParticipant) {
      return;
    }

    Rooms.update(roomId, {
      $pull: {
        participants: {
          userId: this.userId,
          peerId: peerId
        }
      }
    })
  },
});
