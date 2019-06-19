import Rooms from '/imports/db/rooms/collection.js';

Meteor.methods({
  createRoom() {
    return Rooms.insert({
      participants: []
    });
  },

  joinRoom({roomId, peerId}) {
    const room = Rooms.findOne(roomId);

    if (!room) {
      throw new Meteor.Error('No room found!');
    }

    const foundParticipant = room.participants.find(part => part.userId === this.userId);

    if (foundParticipant) {
      Rooms.update(roomId, {
        $pull: {
          participants: {
            userId: this.userId
          }
        }
      });
    }

    Rooms.update(roomId, {
      $push: {
        participants: {
          userId: this.userId,
          peerId: peerId
        }
      }
    });
  },

  leaveRoom({roomId, peerId}) {
    const room = Rooms.findOne(roomId);

    if (!room) {
      throw new Meteor.Error('No room found!');
    }

    const foundParticipant = room.participants.find(part => part.userId === this.userId);

    if (!foundParticipant) {
      return;
    }

    if (room.participants.length === 1) {
      Rooms.remove({_id: room._id})
    } else {
      Rooms.update(roomId, {
        $pull: {
          participants: {
            userId: this.userId,
            peerId: peerId
          }
        }
      });
    }

  },

  getRoomParticipants({roomId}) {
    const room = Rooms.findOne(roomId);

    if (!room) {
      throw new Meteor.Error('No room.');
    }

    return room.participants.filter(participant => participant.userId !== this.userId);
  }
});
