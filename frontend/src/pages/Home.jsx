import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [sort, setSort] = useState("new");
	const { user } = useContext(AuthContext);

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/posts?sort=${sort}`).then((res) => setPosts(res.data));
	}, [sort]);

	return (
		<div>
			{(user && user.username == "Sari") ? 
			<Link to="create">Create post</Link> :
			<></>
			}
			<select value={sort} onChange={(e) => setSort(e.target.value)}>
				<option value="new">New</option>
				<option value="top">Top</option>
			</select>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};

export default Home;
