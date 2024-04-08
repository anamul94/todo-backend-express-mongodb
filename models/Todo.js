const { default: mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [20, "Title should not exeeds 20 chracter"],
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
