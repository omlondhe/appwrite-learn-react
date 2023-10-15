import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appWriteAuthService } from "./appwrite/auth";
import { login, logout } from "./store/features/AuthSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		appWriteAuthService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	return loading ? (
		<div className="h-screen w-screen grid place-items-center">
			<div className="w-10 h-10 p-5 animate-ping bg-white rounded-full"></div>
		</div>
	) : (
		<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
			<div className="w-full block">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
}

export default App;
