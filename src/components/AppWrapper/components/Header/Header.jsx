import {
	Center,
	Group,
	Header as HeadBar,
	MediaQuery,
	Text,
	TextInput,
} from "@mantine/core";
import { useIcons, useThemeBreakpoint } from "../../../../hooks";

export const Header = () => {
	const getIcon = useIcons();
	const matches = useThemeBreakpoint("xs");
	return (
		<HeadBar
			height={70}
			px="xl"
			sx={{
				display: "flex",
				justifyContent: matches ? "space-between" : "center",
				alignItems: "center",
			}}>
			<Group sx={{ alignItems: "center" }}>
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
			<MediaQuery smallerThan="xs" styles={{ display: "none" }}>
				<TextInput
					sx={{
						display: "inline-block",
						width: "20rem",
					}}
					mr="xl"
					radius="xl"
					placeholder="Search"
					type="search"
					icon={getIcon("search", 20)}
				/>
			</MediaQuery>
		</HeadBar>
	);
};
