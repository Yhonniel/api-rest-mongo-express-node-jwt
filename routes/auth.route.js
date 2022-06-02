import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  BodyLoginValidator,
  BodyRegisterValidator,
} from "../middlewares/validatorManager.js";
const router = Router();

router.post("/register", BodyRegisterValidator, register);
router.post("/login", BodyLoginValidator, login);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;
