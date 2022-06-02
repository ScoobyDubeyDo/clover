import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Card,
	Group,
	Highlight,
	Popover,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useColorScheme, useScrollLock } from "@mantine/hooks";
import { selectAllUsers } from "../../app/slices";
import { useDebounce, useIcons, useThemeBreakpoint } from "../../hooks";

export const SearchInput = () => {
	const getIcon = useIcons();
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [_, setScrollLocked] = useScrollLock();
	const matches = useThemeBreakpoint("xs");
	const allUsers = useSelector(selectAllUsers);
	const debouncedInput = useDebounce(searchInput);
	const colorScheme = useColorScheme();
	const isDark = colorScheme === "dark";

	const navigate = useNavigate();
	useEffect(() => {
		if (debouncedInput !== "") {
			const startsWith = allUsers.filter((item) =>
				item.fullName
					.toLowerCase()
					.startsWith(debouncedInput.toLowerCase())
			);
			const includes = allUsers.filter(
				(item) =>
					item.fullName
						.toLowerCase()
						.includes(debouncedInput.toLowerCase()) &&
					!startsWith.includes(item)
			);
			setSearchResults([
				...startsWith,
				...includes.sort((a, b) =>
					a.fullName.localeCompare(b.fullName)
				),
			]);
		}
	}, [debouncedInput, allUsers]);

	return (
		<Popover
			mr="xl"
			radius="md"
			opened={popoverOpened}
			position="bottom"
			placement="center"
			styles={{
				body: {
					minWidth: matches ? "20rem" : "100%",
					maxWidth: matches ? "20rem" : "100%",
					maxHeight: matches ? "30rem" : "35rem",
					overflow: "auto",
					wordBreak: "break-all",
				},
				root: {
					minWidth: matches ? "20rem" : "100%",
				},
			}}
			trapFocus={false}
			transition="scale"
			onClose={() => {
				setScrollLocked(false);
				setSearchInput("");
				setSearchResults([]);
			}}
			onFocusCapture={() => {
				setPopoverOpened(true);
				setScrollLocked(true);
			}}
			onBlurCapture={() => setPopoverOpened(false)}
			target={
				<TextInput
					sx={{
						display: "inline-block",
						width: matches ? "20rem" : "100%",
					}}
					value={searchInput}
					onChange={(e) => setSearchInput(e.currentTarget.value)}
					radius="xl"
					placeholder="Search"
					type="search"
					icon={getIcon("search", 20)}
				/>
			}>
			<Card m="0">
				{searchInput === "" ? (
					<Title
						order={3}
						align="center"
						sx={{
							width: "100%",
						}}>
						Search for users
					</Title>
				) : !searchResults.length ? (
					<Title
						order={3}
						align="center"
						sx={{
							width: "100%",
						}}>
						No user found!
					</Title>
				) : (
					searchResults.map(
						({ uid, avatarUrl, fullName, username }) => (
							<Card.Section
								mb="xs"
								key={uid}
								sx={{ cursor: "pointer" }}
								onClick={() => {
									navigate(`/profile/${uid}`);
									setPopoverOpened(false);
									setSearchInput("");
									setSearchResults([]);
								}}>
								<Group position="left">
									<Avatar size="lg" ml="xs" src={avatarUrl}>
										{getIcon("profile", 40)}
									</Avatar>
									<Stack sx={{ gap: 0 }}>
										<Highlight
											highlightStyles={(theme) => ({
												backgroundImage:
													theme.fn.linearGradient(
														30,
														theme.colors.blue[
															isDark ? 4 : 6
														],
														theme.colors.lime[
															isDark ? 4 : 6
														]
													),
												fontWeight: 700,
												WebkitBackgroundClip: "text",
												WebkitTextFillColor:
													"transparent",
											})}
											highlight={searchInput}>
											{fullName}
										</Highlight>

										<Text
											sx={{ wordWrap: "anywhere" }}
											size="sm"
											lineClamp={1}
											color="gray">
											{`@${username}`}
										</Text>
									</Stack>
								</Group>
							</Card.Section>
						)
					)
				)}
			</Card>
		</Popover>
	);
};
