import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controllers/todoController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.route("/createTodo").post( createTodo);
router.route("/getTodo").get(getTodo);
router.route("/updateTodo/:todoId").put( updateTodo);
router.route("/deleteTodo/:todoId").delete(deleteTodo);

export default router;
