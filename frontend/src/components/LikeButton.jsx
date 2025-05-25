import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ postId, initialLiked, initialLikes }) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [liked, setLiked] = useState(initialLiked);
	const token = localStorage.getItem("token");

	const toggleLike = () => {
		if (!user) {
			navigate("/login");
			return;
		}

		if (!liked) {
			axios
				.post(
					`${import.meta.env.VITE_API_URL}/likes/${postId}`,
					{},
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then(() => {
					window.location.reload();
				});
		} else {
			axios
				.delete(
					`${import.meta.env.VITE_API_URL}/likes/${postId}`,
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then(() => {
					window.location.reload();
				});
		}
	};

	if (initialLiked != liked) setLiked(initialLiked);

	return (
		<button onClick={toggleLike} style={{ color: liked ? "red" : "black" }}>
			❤️ Like:  {initialLikes}
		</button>
	);
};

export default LikeButton;
