const todoService = require("../services/todoService");

exports.createTodo = async (req, res) => {
  try {

    const todo = await todoService.createTodo(req.body);

    res.status(201).json(todo);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getTodos = async (req, res) => {
  try {

    const todos = await todoService.getTodos(req.query);

    res.json(todos);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getTodo = async (req, res) => {
  try {

    const todo = await todoService.getTodo(req.params.id);

    res.json(todo);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {

    const todo = await todoService.updateTodo(
      req.params.id,
      req.body
    );

    res.json(todo);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {

    await todoService.deleteTodo(req.params.id);

    res.json({
      message: "Todo deleted"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {

    const stats = await todoService.getStats();

    res.json(stats);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};