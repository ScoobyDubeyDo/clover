import { useNavigate } from "react-router-dom";
import { Center, Group, Header as HeadBar, Text } from "@mantine/core";
import { useIcons, useThemeBreakpoint } from "../../../../hooks";
import { SearchInput } from "../../../index";

export const Header = () => {
	const getIcon = useIcons();
	const matches = useThemeBreakpoint("xs");
	const navigate = useNavigate();
	return (
		<HeadBar
			height={70}
			px="xl"
			sx={{
				display: "flex",
				justifyContent: matches ? "space-between" : "center",
				alignItems: "center",
			}}>
			<Group sx={{ alignItems: "center" }} onClick={() => navigate("/")}>
				<Center>{getIcon("logo")}</Center>
				<Text
					variant="gradient"
					gradient={{ from: "blue", to: "lime", deg: 30 }}
					weight={700}
					sx={{
						fontFamily: "Handlee, cursive",
						fontSize: 30,
					}}>
					Clover
				</Text>
			</Group>
			{matches && <SearchInput />}
		</HeadBar>
	);
};
