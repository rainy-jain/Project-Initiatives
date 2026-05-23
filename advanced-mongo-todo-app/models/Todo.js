const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  description: {
    type: String
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  completed: {
    type: Boolean,
    default: false
  },

  archived: {
    type: Boolean,
    default: false
  },

  dueDate: Date,

  tags: [String],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  subTasks: [subTaskSchema]

}, {
  timestamps: true
});

// Compound Index
todoSchema.index({
  userId: 1,
  completed: 1,
  dueDate: -1
});

// Unique Compound Index
todoSchema.index(
  {
    title: 1,
    userId: 1
  },
  {
    unique: true
  }
);

// Text Index
todoSchema.index({
  title: "text",
  description: "text"
});

// Sparse Index
todoSchema.index(
  {
    dueDate: 1
  },
  {
    sparse: true
  }
);

// TTL Index
todoSchema.index(
  {
    createdAt: 1
  },
  {
    expireAfterSeconds: 2592000
  }
);

// Partial Index
todoSchema.index(
  {
    archived: 1
  },
  {
    partialFilterExpression: {
      archived: true
    }
  }
);

module.exports = mongoose.model("Todo", todoSchema);