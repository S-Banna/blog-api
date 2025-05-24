import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<nav>
			<div>
				<span>Welcome to my blog!</span>
				<a
					href="https://github.com/S-Banna"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/github-icon.png" alt="GitHub" />
				</a>
			</div>
			<div>
				{user ? (
					<>
						<span>Welcome, {user.username}!</span>
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
