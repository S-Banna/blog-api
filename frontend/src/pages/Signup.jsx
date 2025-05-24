import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSignup = async () => {
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password });
			navigate("/login");
		} catch (err) {
			alert("Signup failed " + err);
		}
	};

	return (
		<div className="auth-form">
			<h2>Signup</h2>
			<input
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleSignup}>Signup</button>
		</div>
	);
};

export default Signup;
