import { Router } from "express";
import {
  createPost,
  getPosts,
  likePost,
  commentPost
} from "../controllers/postController.js";
import upload from "../middleware/uploadMiddleware.js";
import { verifyJWT } from "../middleware/authMiddleware.js";


const router = Router();

router.post("/", verifyJWT, upload.single("image"), createPost);
router.get("/", getPosts);
router.put("/:id/like", verifyJWT, likePost);
router.post("/:id/comment", verifyJWT, commentPost);

export default router;