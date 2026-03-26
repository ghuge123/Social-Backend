import { Card, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { request } from "../services/api";

export default function PostCard({ post, refresh, userId }) {

  // Check if liked
  const isLiked = userId && post.likes.includes(userId);

  // Like handler
  const handleLike = async () => {
    try {
      await request(`/posts/${post._id}/like`, "PUT");
      refresh();
    } catch {
      alert("Login required");
      window.location.href = "/login";
    }
  };

  // Comment handler
  const handleComment = async () => {
    const text = prompt("Enter your comment");

    if (!text) return;

    try {
      await request(`/posts/${post._id}/comment`, "POST", { text });
      refresh();
    } catch {
      alert("Login required");
      window.location.href = "/login";
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <CardContent>

        {/* Username */}
        <Typography variant="h6">
          {post.user?.username}
        </Typography>

        {/* Text */}
        <Typography>{post.text}</Typography>

        {/* Image */}
        {post.image && (
          <img
            src={`https://social-backend-2pe5.onrender.com/${post.image}`}
            className="img-fluid mt-2 rounded"
            alt="post"
          />
        )}

        {/* Like + Comment Section */}
        <div className="d-flex align-items-center mt-3">

          {/* Like */}
          <IconButton onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          <Typography className="me-3">
            {post.likes.length}
          </Typography>

          {/* Comment */}
          <IconButton onClick={handleComment}>
            <ChatBubbleOutlineIcon />
          </IconButton>

          <Typography>
            {post.comments.length}
          </Typography>

        </div>

        {/* Optional: Show comments list (bonus) */}
        {post.comments.length > 0 && (
          <div className="mt-2">
            {post.comments.map((c, i) => (
              <Typography key={i} variant="body2">
                • {c.text}
              </Typography>
            ))}
          </div>
        )}

      </CardContent>
    </Card>
  );
}