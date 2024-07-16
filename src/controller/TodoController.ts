import { RequestHandler } from "express";
import { Todo } from "../domains/Todo";

const TODOS_DB: Todo[] = [];

export const createTODO: RequestHandler = (req, res, next) => {
  let desc: string = (req.body as { text: string }).text;
  let newTodo = new Todo(Math.random(), desc);
  TODOS_DB.push(newTodo);
  res
    .status(201)
    .json({ message: "new todo created sucessfully", todo: newTodo });
};

export const updateTODO: RequestHandler = (req, res, next) => {
  let todoId: number = parseInt(req.params.id);
  let desc: string = (req.body as { text: string }).text;

  let todo = TODOS_DB.filter((data) => data.id === todoId);
  if (!todo) throw Error("todo does not exists");
  TODOS_DB.filter((data) => data.id === todoId).map((todo) => ({
    ...todo,
    desc: desc,
  }));
  console.log(`updated the todo data successfully :: ${desc}`);

  console.log(`updated todos ${TODOS_DB}`);

  res.status(200).json(todo);
};

export const deleteTODO: RequestHandler = (req, res, next) => {
  let todoId: number = parseInt(req.params.id);

  let updateTODOs: Todo[] = TODOS_DB.filter((data) => data.id != todoId);
  TODOS_DB.splice(0, TODOS_DB.length);

  TODOS_DB.push.apply(updateTODOs);
  res.status(200).json({ message: `successfully deleted todo: ${todoId}` });
};

export const getTODOById: RequestHandler = (req, res, next) => {
  let todoId: number = parseInt(req.params.id);
  res.status(200).json(TODOS_DB.filter((data) => data.id === todoId));
};

export const getAllTODOS: RequestHandler = (req, res, next) => {
  res.status(200).json(TODOS_DB);
};
