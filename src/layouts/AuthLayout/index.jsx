import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}
		setLoading(false);
	}, [authStatus, navigate]);

	return loading ? (
		<div className="h-screen w-screen grid place-items-center">
			<div className="w-10 h-10 p-5 animate-ping bg-white rounded-full"></div>
		</div>
	) : (
		{ children }
	);
};

export default AuthLayout;
