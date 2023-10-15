import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/AuthSlice";
import { appWriteAuthService } from "../../appwrite/auth";

const LogOutButton = () => {
	const dispatch = useDispatch();

	const handleLogOutClick = () => {
		appWriteAuthService
			.logout()
			.then(() => dispatch(logout()))
			.catch((error) => console.log(error));
	};

	return (
		<button
			className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
			onClick={handleLogOutClick}
		>
			Log out
		</button>
	);
};

export default LogOutButton;
