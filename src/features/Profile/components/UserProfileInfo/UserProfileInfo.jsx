import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import {
	followUser,
	getSingleUser,
	removeSingleUserData,
	selectProfileData,
	selectSingleUserData,
	setProfileData,
	unFollowUser,
} from "../../../../app/slices";
import { SettingsModal } from "../../../../components/SettingsModal/SettingsModal";
import { useIcons, useThemeBreakpoint } from "../../../../hooks";
import { EditProfile, FollowersModal, FollowingModal } from "./components";

const dataBuilder = (isCurrentUser, currentUser, singleUser) => {
	const temp2 = {};
	[
		"bannerUrl",
		"avatarUrl",
		"followers",
		"following",
		"posts",
		"bio",
		"website",
		"fullName",
		"username",
	].forEach((ele) => {
		isCurrentUser
			? (temp2[ele] = currentUser[ele])
			: (temp2[ele] = singleUser[ele]);
	});
	return temp2;
};

export const UserProfileInfo = ({ children }) => {
	const mdMatches = useThemeBreakpoint("md");
	const xsMatches = useThemeBreakpoint("xs");
	const { colorScheme } = useMantineColorScheme();
	const [editProfileModal, setEditProfileModal] = useState(false);
	const [followingModal, setFollowingModal] = useState(false);
	const [followersModal, setFollowersModal] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const settingsIcon = useIcons("settings", 20);
	const singleUser = useSelector(selectSingleUserData);
	const currentUser = useSelector(selectProfileData);
	const dispatch = useDispatch();
	const { userId } = useParams();
	const { uid } = currentUser;
	const isCurrentUser = userId === uid;
	const isDark = colorScheme === "dark";
	const [isFollowing, setIsFollowing] = useState(
		singleUser.followers.includes(currentUser?.uid)
	);
	const data = dataBuilder(isCurrentUser, currentUser, singleUser);

	useEffect(() => {
		if (!isCurrentUser) {
			dispatch(getSingleUser(userId));
		}
		return () => {
			dispatch(removeSingleUserData());
		};
	}, [dispatch, userId, isCurrentUser]);

	const followUserHandler = () => {
		dispatch(
			followUser({
				currentUserID: currentUser?.uid,
				followedUserID: singleUser?.uid,
			})
		);
		dispatch(
			setProfileData({
				following: [...currentUser.following, singleUser?.uid],
			})
		);
		setIsFollowing(true);
	};
	const unFollowUserHandler = () => {
		dispatch(
			unFollowUser({
				currentUserID: currentUser?.uid,
				followedUserID: singleUser?.uid,
			})
		);
		dispatch(
			setProfileData({
				following: [
					...currentUser.following.filter(
						(ele) => ele !== singleUser?.uid
					),
				],
			})
		);
		setIsFollowing(false);
	};

	return (
		<>
			<Image
				withPlaceholder
				mx="-1rem"
				mt="-1rem"
				height={mdMatches ? 300 : 200}
				fit="cover"
				src={data.bannerUrl}
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
								src={data.avatarUrl}
								size="100%"
								alt="user profile"
							/>
						</AspectRatio>
					</Paper>
					{isCurrentUser ? (
						<>
							<>
								{!xsMatches && (
									<SettingsModal
										setOpened={setIsModalOpen}
										opened={isModalOpen}
										target={
											<ActionIcon
												onClick={() =>
													setIsModalOpen((o) => !o)
												}
												size="lg"
												radius="xl"
												variant="outline">
												{settingsIcon}
											</ActionIcon>
										}
									/>
								)}
							</>
							<Button
								ml={xsMatches ? "auto" : 0}
								onClick={() => setEditProfileModal(true)}
								size="sm"
								color={isDark ? "gray" : "dark"}
								variant="outline">
								Edit profile
							</Button>{" "}
						</>
					) : (
						<Button
							ml="auto"
							onClick={
								isFollowing
									? unFollowUserHandler
									: followUserHandler
							}
							size="sm"
							color={isDark ? "gray" : "dark"}
							variant={isFollowing ? "outline" : "light"}>
							{isFollowing ? "Unfollow" : "Follow"}
						</Button>
					)}
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
						{data.fullName}
					</Title>
					<Text color="dimmed" lineClamp={1}>
						{`@${data.username}`}
					</Text>
				</Stack>
				<Text
					sx={{
						whiteSpace: "pre-wrap",
					}}>
					{data.bio}
				</Text>
				<Anchor href={data.website} target="_blank">
					{data.website}
				</Anchor>
				<Group position="left">
					<Text>
						<Text component="span" weight="bold">
							{data.posts.length}
						</Text>
						&nbsp; Cloves&nbsp;
					</Text>
					<Text
						onClick={() => setFollowingModal(true)}
						sx={{
							"&:hover , &:hover *": {
								textDecoration: "underline",
								cursor: "pointer",
							},
						}}>
						<Text component="span" weight="bold">
							{data.following.length}
						</Text>
						&nbsp; Following
					</Text>
					<Text
						onClick={() => setFollowersModal(true)}
						sx={{
							"&:hover , &:hover *": {
								textDecoration: "underline",
								cursor: "pointer",
							},
						}}>
						<Text component="span" weight="bold">
							{data.followers.length}
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
			<FollowingModal
				opened={followingModal}
				setOpened={setFollowingModal}
				followingList={data.following}
			/>
			<FollowersModal
				opened={followersModal}
				setOpened={setFollowersModal}
				followersList={data.followers}
			/>
		</>
	);
};
