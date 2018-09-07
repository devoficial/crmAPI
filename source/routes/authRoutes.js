import express  from  "express";

import { register, login } from "../controllers/userControllers";

const router = express.Router();

/**
 * User authentication routes
 *
 */

router.route("/register")
	.post(register);

router.route("/login")
	.post(login);

export default router;