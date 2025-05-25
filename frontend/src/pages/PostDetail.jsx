import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import LikeButton from "../components/LikeButton";

const PostDetail = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const token = localStorage.getItem("token");
	const [likedByUser, setLikedByUser] = useState(false);

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`).then((res) => {
			setPost(res.data);
		});
		axios
			.get(`${import.meta.env.VITE_API_URL}/comments/${id}`)
			.then((res) => setComments(res.data));
	}, [id]);

	useEffect(() => {
		setLikedByUser(post && user ? !!post.likes.find((like) => like.userId == user.id) : false);
	}, [post, user]);

	const addComment = () => {
		if (commentText == "") return;
		if (!user) {
			navigate("/login");
			return;
		}
		axios
			.post(
				`${import.meta.env.VITE_API_URL}/comments/${id}`,
				{ content: commentText, postId: id, userId: user.id },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				window.location.reload();
			});
	};

	if (!post) return <div>Loading...</div>;

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<LikeButton
				postId={post.id}
				initialLiked={likedByUser}
				initialLikes={post.likes.length || 0}
			/>
			<div>
				<h3>Comments</h3>
				{user ? (
					<div>
						<textarea
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						/>
						<button onClick={addComment}>Add Comment</button>
					</div>
				) : (
					<button onClick={() => navigate("/login")}>Login to comment</button>
				)}
				{comments.map((comment) => (
					<div key={comment.id}>
						<strong>{comment.user?.username || "Unkown"}</strong>:{" "}
						{comment.content}
					</div>
				))}
			</div>
		</div>
	);
};

export default PostDetail;
