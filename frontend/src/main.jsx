import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

export default router;

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
