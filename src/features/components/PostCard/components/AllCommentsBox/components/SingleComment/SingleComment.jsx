import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActionIcon,
	Avatar,
	Group,
	Menu,
	Stack,
	Text,
	Textarea,
} from "@mantine/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
	deleteComment,
	editComment,
	selectAllUsers,
	selectProfileData,
} from "../../../../../../../app/slices";
import { useIcons } from "../../../../../../../hooks";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const SingleComment = ({
	userId,
	commentText: commentValue,
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
	const [isEditing, setIsEditing] = useState(false);
	const [commentText, setCommentText] = useState(commentValue);
	const editCommentInputRef = useRef();

	const deleteThisComment = () => {
		dispatch(
			deleteComment({
				commentId,
				postId,
			})
		);
	};

	const editThisComment = () => {
		const text = editCommentInputRef.current.value.trim();
		dispatch(
			editComment({
				commentId,
				commentText: text,
			})
		);
		setIsEditing(false);
		setCommentText(text);
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
						<Text
							sx={{ wordWrap: "anywhere" }}
							lineClamp={1}
							color="gray"
							size="xs">
							{timeAgo.format(
								typeof uploadDate.toDate === "function"
									? uploadDate?.toDate()
									: new Date()
							)}
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
									onClick={() =>
										isEditing
											? setIsEditing(false)
											: setIsEditing(true)
									}
									icon={getIcons("edit", 18)}>
									{isEditing
										? "Cancel editing"
										: "Edit comment"}
								</Menu.Item>

								<Menu.Item
									onClick={deleteThisComment}
									icon={getIcons("delete", 20)}>
									Delete comment
								</Menu.Item>
							</Menu>
						)}
					</Group>
					{isEditing ? (
						<Textarea
							autosize
							onKeyUp={(e) => {
								if (e.key === "Enter") editThisComment();
							}}
							ref={editCommentInputRef}
							defaultValue={commentText}
							minRows={1}
							maxRows={3}
							radius="xl"
							size="sm"
							autoFocus={true}
							rightSection={
								<ActionIcon
									onClick={editThisComment}
									variant="transparent">
									{getIcons("send", 24)}
								</ActionIcon>
							}
							rightSectionWidth={46}
						/>
					) : (
						<Text size="sm">{commentText}</Text>
					)}
				</Stack>
			</Group>
		</Group>
	);
};
