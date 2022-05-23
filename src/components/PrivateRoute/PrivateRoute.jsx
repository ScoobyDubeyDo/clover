import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUserToken } from "../../features/authentication/authenticationSlice";

export const PrivateRoute = ({ switchPath = true }) => {
	const location = useLocation();
	const userToken = useSelector(selectUserToken);

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
