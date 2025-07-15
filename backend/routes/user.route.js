import express from "express";
import { login, logout, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
