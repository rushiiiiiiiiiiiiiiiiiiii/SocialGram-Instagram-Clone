import React, { useState } from "react";
const initialPosts = [
  { id: 1, content: 'Post 1', likes: 0 },
  { id: 2, content: 'Post 2', likes: 0 },
  { id: 3, content: 'Post 3', likes: 0 },
];

const Post = ({ post, handleLike }) => (
  <div>
    <p>{post.content}</p>
    <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
  </div>
);

const Apps = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (id) => {
    console.log(posts)
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default Apps;