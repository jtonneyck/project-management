const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  task: {type: Schema.Types.ObjectId, ref: 'Project'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;