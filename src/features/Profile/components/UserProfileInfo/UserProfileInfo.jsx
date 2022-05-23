import { useState } from "react";
import { useSelector } from "react-redux";
import {
	ActionIcon,
	Anchor,
	AspectRatio,
	Avatar,
	Button,
	Divider,
	Group,
	Image,
	Paper,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import { selectProfileData } from "../../../../app/slices";
import { SettingsModal } from "../../../../components/SettingsModal/SettingsModal";
import { useIcons, useThemeBreakpoint } from "../../../../hooks";
import { EditProfile } from "../EditProfile/EditProfile";

export const UserProfileInfo = ({ children }) => {
	const mdMatches = useThemeBreakpoint("md");
	const xsMatches = useThemeBreakpoint("xs");
	const { colorScheme } = useMantineColorScheme();
	const [editProfileModal, setEditProfileModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isDark = colorScheme === "dark";
	const settingsIcon = useIcons("settings", 20);
	const {
		bannerUrl,
		avatarUrl,
		followers,
		following,
		posts,
		bio,
		website,
		fullName,
		username,
	} = useSelector(selectProfileData);

	return (
		<>
			<Image
				withPlaceholder
				mx="-1rem"
				mt="-1rem"
				height={mdMatches ? 300 : 200}
				fit="cover"
				src={bannerUrl}
				alt="user cover"
			/>
			<Stack sx={{ gap: "0.5rem" }}>
				<Group
					p="xs"
					sx={{
						position: "relative",
						height: "4rem",
					}}>
					<Paper
						p={2}
						sx={{
							position: "absolute",
							bottom: 0,
							borderRadius: "50%",
							width: xsMatches ? "25%" : 100,
							maxWidth: 200,
						}}>
						<AspectRatio ratio={1 / 1}>
							<Avatar
								src={avatarUrl}
								size="100%"
								alt="user profile"
							/>
						</AspectRatio>
					</Paper>
					{!xsMatches && (
						<SettingsModal
							setOpened={setIsModalOpen}
							opened={isModalOpen}
							target={
								<ActionIcon
									onClick={() => setIsModalOpen((o) => !o)}
									size="lg"
									radius="xl"
									variant="outline">
									{settingsIcon}
								</ActionIcon>
							}
						/>
					)}

					<Button
						ml={xsMatches ? "auto" : 0}
						onClick={() => setEditProfileModal(true)}
						size="sm"
						color={isDark ? "gray" : "dark"}
						variant="outline">
						Edit profile
					</Button>
				</Group>
				<Stack
					sx={{
						gap: 0,
						width: "100%",
					}}>
					<Title
						component={Text}
						lineClamp={1}
						order={2}
						sx={{
							wordWrap: "anywhere",
						}}>
						{fullName}
					</Title>
					<Text color="dimmed" lineClamp={1}>
						{username}
					</Text>
				</Stack>
				<Text>{bio}</Text>
				<Anchor href={website} target="_blank">
					{website}
				</Anchor>
				<Group position="left">
					<Text>
						<Text component="span" weight="bold">
							{posts.length}
						</Text>
						&nbsp; Cloves&nbsp;
					</Text>
					<Text
						sx={{
							"&:hover , &:hover *": {
								textDecoration: "underline",
								cursor: "pointer",
							},
						}}>
						<Text component="span" weight="bold">
							{following.length}
						</Text>
						&nbsp; Following
					</Text>
					<Text
						sx={{
							"&:hover , &:hover *": {
								textDecoration: "underline",
								cursor: "pointer",
							},
						}}>
						<Text component="span" weight="bold">
							{followers.length}
						</Text>
						&nbsp; Followers
					</Text>
				</Group>
				<Divider mt="md" mb="lg" />
			</Stack>
			{children}
			<EditProfile
				opened={editProfileModal}
				setOpened={setEditProfileModal}
			/>
		</>
	);
};
