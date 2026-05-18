const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  context: {
    type: String,
    required: true,
  },

  keystrokes: {
    type: [Number],
    default: [],
  },

  paste: {
    type: [Number],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

module.exports = mongoose.model("Note", noteSchema);