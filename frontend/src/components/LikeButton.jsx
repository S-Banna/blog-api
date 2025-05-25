import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ postId, initialLiked, initialLikes }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [liked, setLiked] = useState(initialLiked);
	const [likes, setLikes] = useState(initialLikes);
	const token = localStorage.getItem("token");

	useEffect(() => {
		setLiked(initialLiked);
		setLikes(initialLikes);
	}, [initialLiked, initialLikes]);

	const toggleLike = async () => {
		if (!user) {
			navigate("/login");
			return;
		}

		try {
			if (!liked) {
				await axios.post(
					`${import.meta.env.VITE_API_URL}/likes/${postId}`,
					{},
					{ headers: { authorization: `Bearer ${token}` } }
				);
				setLiked(true);
				setLikes((prev) => prev + 1);
			} else {
				await axios.delete(`${import.meta.env.VITE_API_URL}/likes/${postId}`, {
					headers: { authorization: `Bearer ${token}` },
				});
				setLiked(false);
				setLikes((prev) => prev - 1);
			}
		} catch (error) {
			console.error("Like toggle error:", error);
		}
	};

	return (
		<button onClick={toggleLike} style={{ color: liked ? "red" : "black" }}>
			❤️ Like: {likes}
		</button>
	);
};

export default LikeButton;