import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import {
	deleteComment,
	selectAllUsers,
	selectProfileData,
} from "../../../../../../../app/slices";
import { useIcons } from "../../../../../../../hooks";

export const SingleComment = ({
	userId,
	commentText,
	uploadDate,
	commentId,
	postId,
}) => {
	const currentUser = useSelector(selectProfileData);
	const otherUser = useSelector(selectAllUsers);
	const dispatch = useDispatch();
	const allUsers = [...otherUser, currentUser];
	const getIcons = useIcons();
	const singleUser = allUsers.find((user) => user.uid === userId);
	const { avatarUrl, fullName, uid: thisUserId } = singleUser;

	const deleteThisComment = () => {
		dispatch(
			deleteComment({
				commentId,
				postId,
			})
		);
	};

	return (
		<Group
			my="xs"
			position="left"
			sx={(theme) => ({
				gap: theme.spacing.lg,
				alignItems: "flex-start",
			})}>
			<Avatar size="md" ml="xs" src={avatarUrl}>
				{getIcons("profile")}
			</Avatar>
			<Group
				px="xs"
				sx={(theme) => ({
					width: "100%",
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[1],
					borderRadius: theme.radius.md,
				})}>
				<Stack sx={{ width: "100%", gap: 0 }}>
					<Group
						sx={{
							width: "100%",
						}}>
						<Text
							transform="uppercase"
							sx={{ wordWrap: "anywhere" }}
							lineClamp={1}
							color="dimmed"
							size="md">
							{fullName}
						</Text>
						{thisUserId === currentUser.uid && (
							<Menu
								ml="auto"
								control={
									<ActionIcon size="lg" variant="transparent">
										{getIcons("menu", 20)}
									</ActionIcon>
								}
								closeOnScroll
								zIndex="99"
								withArrow
								withinPortal
								position="left"
								gutter={10}
								transition="rotate-left">
								<Menu.Item
									// onClick={() => unFollowUserHandler()}
									icon={getIcons("edit", 18)}>
									Edit comment
								</Menu.Item>

								<Menu.Item
									onClick={deleteThisComment}
									icon={getIcons("delete", 20)}>
									Delete comment
								</Menu.Item>
							</Menu>
						)}
					</Group>
					<Text transform="uppercase" size="sm">
						{commentText}
					</Text>
				</Stack>
			</Group>
		</Group>
	);
};
