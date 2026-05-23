const todoRepository = require("../repositories/todoRepository");

class TodoService {

  async createTodo(data) {
    return todoRepository.create(data);
  }

  async getTodos(query) {

    const filter = {};

    if (query.completed) {
      filter.completed = query.completed === "true";
    }

    if (query.priority) {
      filter.priority = query.priority;
    }

    return todoRepository.getAll(filter);
  }

  async getTodo(id) {
    return todoRepository.getById(id);
  }

  async updateTodo(id, data) {
    return todoRepository.update(id, data);
  }

  async deleteTodo(id) {
    return todoRepository.delete(id);
  }

  async getStats() {
    return todoRepository.aggregateStats();
  }
}

module.exports = new TodoService();