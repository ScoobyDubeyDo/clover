import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Button,
	Group,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	followUser,
	selectProfileData,
	setProfileData,
} from "../../../../../../app/slices";
import { useIcons, useThemeBreakpoint } from "../../../../../../hooks";

export const UserChip = ({ uid, name, username, photoURL }) => {
	const avatar = useIcons("profile");
	const matches = useThemeBreakpoint("lg");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const currentUser = useSelector(selectProfileData);

	const followUserHandler = (e) => {
		e.stopPropagation();
		dispatch(
			followUser({
				currentUserID: currentUser?.uid,
				followedUserID: uid,
			})
		);
		dispatch(
			setProfileData({
				following: [...currentUser.following, uid],
			})
		);
	};

	return (
		<UnstyledButton
			onClick={() => navigate(`/profile/${uid}`)}
			component="div"
			sx={(theme) => ({
				display: "block",
				padding: theme.spacing.xs,
				width: "100%",
				"&:hover": {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[2],
				},
			})}>
			<Group position="apart" sx={(theme) => ({ gap: theme.spacing.lg })}>
				<Group>
					<Avatar size="md" ml="xs" src={photoURL}>
						{avatar}
					</Avatar>
					<Stack sx={{ gap: 0 }}>
						<Text
							transform="uppercase"
							sx={{ wordWrap: "anywhere" }}
							lineClamp={1}
							size="md">
							{name}
						</Text>
						<Text
							sx={{ wordWrap: "anywhere" }}
							size="sm"
							lineClamp={1}
							color="gray">
							{`@${username}`}
						</Text>
					</Stack>
				</Group>
				{matches && (
					<Button onClick={followUserHandler} size="sm" compact>
						Follow
					</Button>
				)}
			</Group>
		</UnstyledButton>
	);
};
