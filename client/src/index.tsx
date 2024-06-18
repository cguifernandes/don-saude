import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Layout/login";
import Dashboard from "./components/Layout/dashboard";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./protectedRoutes";
import Collaborators from "./components/Layout/collaborators";
import NewCollaborators from "./components/Layout/new-collaborators";
import EditCollaborator from "./components/Layout/edit-collaborator";
import { CollaboratorProvider } from "./context/CollaboratorContext";

const router = createBrowserRouter([
	{
		path: "/dashboard",
		element: <ProtectedRoute component={<Dashboard />} />,
		children: [
			{
				path: "collaborators",
				element: <Collaborators />,
			},
			{
				path: "new-collaborators",
				element: <NewCollaborators />,
			},
			{
				path: "edit-collaborator/:id",
				element: <EditCollaborator />,
			},
		],
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
			<Toaster />
			<CollaboratorProvider>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</CollaboratorProvider>
		</React.StrictMode>,
	);
}
