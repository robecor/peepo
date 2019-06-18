import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  participants: {
    type: Array,
    optional: false,
    defaultValue: []
  },
  'participants.$': {
    type: new SimpleSchema({
      userId: {
        type: String,
        optional: false
      },
      peerId: {
        type: String,
        optional: false
      }
    }),
    optional: false
  }
});