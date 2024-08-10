const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  delete : {type : Boolean, default : false},
  active : {type : Boolean, default : true}
});

module.exports = mongoose.model('Article', articleSchema);
