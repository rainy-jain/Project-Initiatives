const Todo = require("../models/Todo");

class TodoRepository {

  async create(data) {
    return Todo.create(data);
  }

  async getAll(filter = {}) {
    return Todo.find(filter);
  }

  async getById(id) {
    return Todo.findById(id);
  }

  async update(id, data) {
    return Todo.findByIdAndUpdate(id, data, {
      new: true
    });
  }

  async delete(id) {
    return Todo.findByIdAndDelete(id);
  }

  async aggregateStats() {
    return Todo.aggregate([
      {
        $group: {
          _id: "$priority",
          total: { $sum: 1 }
        }
      }
    ]);
  }

}

module.exports = new TodoRepository();