import { Router } from "express";
import { userRegistration , userLogin , getMe, logout} from "../controllers/userController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);

router.get("/me", verifyJWT, getMe);

router.route("/logout").post(logout);

export default router;