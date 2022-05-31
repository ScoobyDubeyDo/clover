import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Button,
	Group,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import { useIcons } from "../../../../../../hooks";

export const UserDetailsButton = ({
	isCurrentUser = false,
	uid,
	avatarUrl,
	fullName,
	username,
	isFollowing,
	unFollowUserHandler,
	followUserHandler,
	setOpened,
}) => {
	const navigate = useNavigate();
	const avatar = useIcons("profile");

	return (
		<UnstyledButton
			onClick={() => {
				navigate(`/profile/${uid}`);
				setOpened(false);
			}}
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
					<Avatar size="lg" ml="xs" src={avatarUrl}>
						{avatar}
					</Avatar>
					<Stack sx={{ gap: 0 }}>
						<Text
							transform="uppercase"
							sx={{ wordWrap: "anywhere" }}
							lineClamp={1}
							size="md">
							{fullName}
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

				{!isCurrentUser && (
					<Button
						ml="auto"
						onClick={(e) =>
							isFollowing
								? unFollowUserHandler(e, uid)
								: followUserHandler(e, uid)
						}
						size="md"
						variant={isFollowing ? "outline" : "light"}>
						{isFollowing ? "Unfollow" : "Follow"}
					</Button>
				)}
			</Group>
		</UnstyledButton>
	);
};
