import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Card, Group, Image, Spoiler, Text } from "@mantine/core";
import {
	addPostToSaved,
	likePost,
	removePostFromSaved,
	selectProfileData,
	setProfileData,
	unLikePost,
} from "../../../app/slices";
import { EditPostModal } from "../../../components";
import { useIcons } from "../../../hooks";
import { AddNewComment, AllCommentsBox, PostCardHeader } from "./components";

export const PostCard = ({
	post: {
		photoUrl,
		postText,
		uploadDate,
		userId,
		likes,
		comments,
		uid: postId,
	},
}) => {
	const getIcons = useIcons();
	const currentUser = useSelector(selectProfileData);
	const dispatch = useDispatch();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [isLiked, setIsLiked] = useState(
		likes?.some((userId) => userId === currentUser.uid)
	);
	const [isSaved, setIsSaved] = useState(
		currentUser.bookmarked?.some((id) => id === postId)
	);

	const likeHandler = () => {
		dispatch(
			likePost({
				postId,
				currentUserId: currentUser.uid,
			})
		);
		setIsLiked(true);
	};
	const unLikeHandler = () => {
		dispatch(
			unLikePost({
				postId,
				currentUserId: currentUser.uid,
			})
		);
		setIsLiked(false);
	};
	const saveHandler = () => {
		dispatch(
			addPostToSaved({
				postId,
				currentUserId: currentUser.uid,
			})
		);
		dispatch(
			setProfileData({
				bookmarked: [...currentUser.bookmarked, postId],
			})
		);
		setIsSaved(true);
	};
	const unSaveHandler = () => {
		dispatch(
			removePostFromSaved({
				postId,
				currentUserId: currentUser.uid,
			})
		);

		setIsSaved(false);
		dispatch(
			setProfileData({
				bookmarked: [...currentUser.bookmarked].filter(
					(ele) => ele !== postId
				),
			})
		);
	};

	return (
		<>
			<Card
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				})}>
				<PostCardHeader
					postId={postId}
					uploadDate={uploadDate}
					userId={userId}
					setEditModalOpen={setEditModalOpen}
					hasPhoto={!!photoUrl}
				/>
				<Spoiler
					sx={{ wordWrap: "anywhere" }}
					maxHeight={50}
					my="sm"
					showLabel="...see more">
					{postText}
				</Spoiler>
				{!!photoUrl && (
					<Card.Section my="sm">
						<Image
							withPlaceholder
							imageProps={{
								style: { maxHeight: 400, objectFit: "contain" },
							}}
							alt="asdasdsd"
							src={photoUrl}
						/>
					</Card.Section>
				)}
				<Group
					position="apart"
					sx={(theme) => ({
						gap: theme.spacing.lg,
					})}>
					<Group sx={{ flexWrap: "nowrap" }}>
						<ActionIcon
							onClick={() => {
								isLiked ? unLikeHandler() : likeHandler();
							}}
							variant="transparent">
							{isLiked
								? getIcons("like-filled", 28)
								: getIcons("like", 28)}
						</ActionIcon>
						<ActionIcon variant="transparent">
							{getIcons("comment", 28)}
						</ActionIcon>
					</Group>
					<ActionIcon
						onClick={() => {
							isSaved ? unSaveHandler() : saveHandler();
						}}
						variant="transparent">
						{isSaved
							? getIcons("saved-filled", 28)
							: getIcons("saved", 28)}
					</ActionIcon>
				</Group>
				<Text>{likes.length} Likes</Text>
				<AllCommentsBox comments={comments} />
				<AddNewComment postId={postId} />
			</Card>
			<EditPostModal
				opened={editModalOpen}
				postId={postId}
				setOpened={setEditModalOpen}
				text={postText}
			/>
		</>
	);
};
