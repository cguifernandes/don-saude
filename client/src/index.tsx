import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Layout/login";
import Dashboard from "./components/Layout/dashboard";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProtectedRoute component={<Dashboard />} />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<AuthProvider>
				<Toaster />
				<RouterProvider router={router} />
			</AuthProvider>
		</React.StrictMode>,
	);
}
