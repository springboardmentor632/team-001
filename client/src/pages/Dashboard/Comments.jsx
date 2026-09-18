import React, { useState } from "react";

const Comments = () => {
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Dheeraj",
      text: "MBA has better growth.",
    },
  ]);

  const addComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Current User",
      text: comment,
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <div>
      <h2>Comments</h2>

      <textarea
        rows="4"
        value={comment}
        placeholder="Write your comment..."
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <br />

      <button onClick={addComment}>
        Post Comment
      </button>

      <hr />

      {comments.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <strong>{item.user}</strong>

          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;