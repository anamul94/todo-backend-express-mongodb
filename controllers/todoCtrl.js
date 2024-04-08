const Todo = require("../models/Todo");
const ApiFeatures = require("../utils/apiFeature");
const AppError = require("../utils/error/appError");
const asyncErrorHandler = require("../utils/error/asyncErrorHandler");

const createTodo = asyncErrorHandler(async (req, res, next) => {
  const { title, eventDate } = req.body;
  const todoEventDate = new Date(eventDate);
  console.log(new Date(Date.now()));
  console.log(todoEventDate);
  if (todoEventDate < new Date(Date.now()))
    return res.status(400).json({ status: false, msg: "Invalid date" });
  const todo = { title: title, eventDate: todoEventDate, user_id: req.userId };
  const newTodo = await Todo.create(todo);
  res.status(201).json({
    status: true,
    msg: "Todo created",
    data: newTodo,
  });
});

const getTodo = asyncErrorHandler(async (req, res, next) => {
  const apiFeature = new ApiFeatures(
    Todo.find({ user_id: req.userId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const todos = await apiFeature.query;
  if (!todos) return next(new AppError("Not found", 404));

  res.status(200).json({
    status: true,
    results: todos.length,
    data: todos,
  });
});

const getTodoById = asyncErrorHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return next(new AppError("Not found", 404));
  }
  if (todo.user_id != req.userId) {
    return next(new AppError("Forbiden", 403));
  }

  res.status(200).json({
    status: true,
    data: todo,
  });
});

module.exports = {
  createTodo,
  getTodo,
  getTodoById,
};
