import FriendRequestsSchema from './schema';

const FriendRequests = new Mongo.Collection('friendRequests');

FriendRequests.attachSchema(FriendRequestsSchema);

export default FriendRequests;
