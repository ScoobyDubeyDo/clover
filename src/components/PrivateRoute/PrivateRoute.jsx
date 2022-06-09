import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = ({ switchPath = true }) => {
	const location = useLocation();
	const userToken =
		localStorage.getItem("myToken") === "undefined"
			? null
			: localStorage.getItem("myToken");

	if (switchPath) {
		return !!userToken ? (
			<Outlet />
		) : (
			<Navigate
				to="/sign-in"
				replace
				state={{ from: location.pathname }}
			/>
		);
	}
	return !userToken ? (
		<Outlet />
	) : (
		<Navigate to={location.state?.from || "/"} replace />
	);
};
