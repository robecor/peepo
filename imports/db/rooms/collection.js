import RoomSchema from './schema.js';

const Rooms = new Mongo.Collection('rooms');

Rooms.attachSchema(RoomSchema);

export default Rooms;