import { Router } from "express";
import {
  createPost,
  getPosts,
  likePost,
  commentPost
} from "../controllers/postController.js";
import upload from "../middleware/uploadMiddleware.js";
import { verifyUser } from "../middleware/authMiddleware.js";


const router = Router();

router.post("/", verifyUser, upload.single("image"), createPost);
router.get("/", getPosts);
router.put("/:id/like", verifyUser, likePost);
router.post("/:id/comment", verifyUser, commentPost);

export default router;