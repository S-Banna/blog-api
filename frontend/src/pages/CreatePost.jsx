import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const token = localStorage.getItem("token");

	if (!user || user.username !== "Sari") {
		return <div>Access Denied</div>;
	}

	const submitPost = () => {
		axios
			.post(
				`${import.meta.env.VITE_API_URL}/posts`,
				{
					title,
					content
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => navigate("/"));
	};

	return (
		<div>
			<h2>Create Post</h2>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Content"
			/>
			<button onClick={submitPost}>Submit</button>
		</div>
	);
};

export default CreatePost;
