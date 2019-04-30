import CallRequestsSchema from './schema';

const CallRequests = new Mongo.Collection('callRequests');

CallRequests.attachSchema(CallRequestsSchema);

export default CallRequests;
