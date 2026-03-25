import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file ? req.file.path : null;

    if (!text && !image) {
      return res.status(400).json({
        message: "Post must have text or image",
        status: false
      });
    }

    const post = await Post.create({
      user: req.user, // from auth middleware
      text,
      image
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if already liked
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // like
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user;

    if (!text) {
      return res.status(400).json({
        message: "Comment text required"
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      text,
      createdAt: new Date()
    };

    post.comments.push(newComment);

    await post.save();

    return res.status(200).json({
      message: "Comment added",
      comments: post.comments
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};