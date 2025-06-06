import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
	return (
		<div className="post-card">
			<Link to={`/posts/${post.id}`}>
				<h2>{post.title}</h2>
			</Link>
			<div className="meta">
				<span>{new Date(post.createdAt).toLocaleDateString()}</span>
				<span>Likes: {post.likes.length || 0}</span>
			</div>
		</div>
	);
}
