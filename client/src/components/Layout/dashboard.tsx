import { Outlet } from "react-router-dom";
import SideBar from "./aside";
import Header from "./header";

const Dashboard = () => {
	return (
		<div className="flex w-full min-h-screen">
			<SideBar />
			<div className="flex flex-col h-full w-full">
				<Header />
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
