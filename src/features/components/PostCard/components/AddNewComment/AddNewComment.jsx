import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Avatar, Textarea } from "@mantine/core";
import { addComment, selectProfileData } from "../../../../../app/slices";
import { useIcons } from "../../../../../hooks";

export const AddNewComment = ({ postId }) => {
	const [newComment, setNewComment] = useState("");
	const getIcons = useIcons();
	const { avatarUrl, uid } = useSelector(selectProfileData);
	const dispatch = useDispatch();
	const addCommentHandler = () => {
		if (!!newComment) {
			dispatch(
				addComment({
					commentText: newComment.trim(),
					userId: uid,
					postId,
				})
			);
			setNewComment("");
		}
	};

	return (
		<Textarea
			onKeyUp={(e) => {
				if (e.key === "Enter") addCommentHandler();
			}}
			autoFocus={false}
			onChange={(e) => setNewComment(e.target.value)}
			value={newComment}
			placeholder="say something..."
			autosize
			minRows={1}
			maxRows={3}
			radius="xl"
			size="sm"
			iconWidth={46}
			sx={{
				"& > *:first-of-type > *:first-of-type": {
					left: 5,
				},
			}}
			icon={
				<Avatar alt="profile of user" src={avatarUrl}>
					{getIcons("profile", 28)}
				</Avatar>
			}
			rightSection={
				<ActionIcon onClick={addCommentHandler} variant="transparent">
					{getIcons("send", 24)}
				</ActionIcon>
			}
			rightSectionWidth={46}
		/>
	);
};
