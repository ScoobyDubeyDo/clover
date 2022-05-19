import { Button, MediaQuery, Navbar as Nav, Stack } from "@mantine/core";

import { useThemeBreakpoint } from "../../../../hooks";
import { useIcons } from "../../../../hooks/useIcons";
import { Navlink } from "./components";

export const Navbar = () => {
	const postIcon = useIcons("post", 20);
	return (
		<MediaQuery smallerThan="xs" styles={{ display: "none" }}>
			<Nav
				sx={{
					"& > *": {
						width: "100%",
					},
				}}
				p="md"
				hiddenBreakpoint="xs"
				width={{ xs: 250, lg: 350, xl: 400 }}>
				<Nav.Section grow mt="md">
					<Stack
						sx={(theme) => ({
							width: "100%",
							m: "md",
							marginLeft: "auto",
							[`@media (min-width: ${theme.breakpoints.lg}px)`]: {
								width: 200,
							},
						})}
						spacing="md">
						<Navlink label="Home" />
						<Navlink label="explore" />
						<Navlink label="Saved" />
						<Button size="md" leftIcon={postIcon} fullWidth>
							Clove it
						</Button>
					</Stack>
				</Nav.Section>
				<Nav.Section
					mt="xs"
					sx={{
						marginLeft: "auto",
						width: "100%",
						maxWidth: 250,
					}}>
					<Navlink
						sx={{ marginLeft: "auto" }}
						username="@amnsdfsdfdsfsdfsdfsffdub-ey"
						label="Amasdfsdfsdfdey"
					/>
				</Nav.Section>
			</Nav>
		</MediaQuery>
	);
};
