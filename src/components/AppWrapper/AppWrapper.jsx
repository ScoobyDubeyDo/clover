import { Outlet } from "react-router-dom";

import { AppShell } from "@mantine/core";

import { BottomBar, Header, Navbar, Sidebar } from "./components";

export const AppWrapper = () => {
	return (
		<AppShell
			navbarOffsetBreakpoint="xs"
			asideOffsetBreakpoint="md"
			fixed
			header={<Header />}
			navbar={<Navbar />}
			aside={<Sidebar />}
			footer={<BottomBar />}>
			<Outlet />
		</AppShell>
	);
};
