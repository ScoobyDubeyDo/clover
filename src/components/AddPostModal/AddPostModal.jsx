import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActionIcon,
	Avatar,
	Box,
	Button,
	Group,
	Image,
	Input,
	LoadingOverlay,
	Modal,
	Stack,
	Text,
	Textarea,
	useMantineTheme,
} from "@mantine/core";
import { nanoid } from "@reduxjs/toolkit";
import AmazingEmojiPicker from "amazing-react-emojipicker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addPost, selectProfileData } from "../../app/slices";
import { storage } from "../../firebase";
import { useIcons } from "../../hooks";

export const AddPostModal = ({ opened, setOpened }) => {
	const getIcon = useIcons();
	const inputRef = useRef();
	const { colorScheme } = useMantineTheme();
	const [openEmoji, setOpenEmoji] = useState(false);
	const [userSelectImg, setUserSelectImg] = useState({
		url: "",
		file: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const {
		avatarUrl,
		username,
		fullName,
		uid: userId,
	} = useSelector(selectProfileData);
	const dispatch = useDispatch();

	const handleUserSelectImg = (e) => {
		const file = e.target.files[0];
		if (file) {
			setUserSelectImg({
				file,
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const addPostHandler = async () => {
		setIsLoading(true);
		if (!!inputRef.current.value || !!userSelectImg.file) {
			const postUid = nanoid();
			let postDownloadURL = "";
			if (!!userSelectImg.file) {
				const postImageRef = ref(storage, `posts/${userId}/${postUid}`);
				const postSnapshot = await uploadBytes(
					postImageRef,
					userSelectImg.file
				);
				postDownloadURL = await getDownloadURL(postSnapshot.ref);
			}

			dispatch(
				addPost({
					postText: inputRef.current.value,
					photoUrl: postDownloadURL,
					userId,
					uid: postUid,
				})
			);
		}
		setOpened(false);
		setIsLoading(false);
		setUserSelectImg({
			url: "",
			file: null,
		});
	};

	return (
		<Modal
			my={-30}
			opened={opened}
			withinPortal={true}
			radius="md"
			size="lg"
			transition="pop"
			title={
				<Group>
					<Avatar size="lg" src={avatarUrl}>
						{getIcon("profile", 40)}
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
							color="dimmed">
							{`@${username}`}
						</Text>
					</Stack>
				</Group>
			}
			onClose={() => {
				setOpened(false);
				inputRef.current.value = "";
				setUserSelectImg({
					url: "",
					file: null,
				});
			}}>
			<LoadingOverlay
				visible={isLoading}
				zIndex={403}
				radius="md"
				overlayOpacity={0.8}
				loaderProps={{
					size: "xl",
					color: "cyan",
				}}
			/>
			<Textarea
				autoFocus
				ref={inputRef}
				placeholder="What are you thinking...."
				autosize
				minRows={!!userSelectImg.file ? 4 : 6}
				maxRows={!!userSelectImg.file ? 4 : 6}
				radius="lg"
				size="xl"
			/>
			{!!userSelectImg.url && (
				<Box
					sx={{
						position: "relative",
					}}>
					<Image
						withPlaceholder
						imageProps={{
							style: {
								maxHeight: 400,
								objectFit: "contain",
							},
						}}
						alt="user upload"
						my="sm"
						src={userSelectImg.url}
						radius="lg"
					/>
					<ActionIcon
						sx={{
							position: "absolute",
							top: 5,
							left: 5,
						}}
						size="md"
						variant="light"
						color="dark"
						onClick={() =>
							setUserSelectImg({
								url: "",
								file: null,
							})
						}>
						{getIcon("close")}
					</ActionIcon>
				</Box>
			)}
			<AmazingEmojiPicker
				darkMode={colorScheme === "dark" ? true : false}
				ref={inputRef}
				visibility={openEmoji}
				setVisibility={setOpenEmoji}
				top={350}
			/>
			<Group position="apart" mt="sm">
				<Group>
					<Input
						sx={{ display: "none" }}
						accept="image/*"
						id="addImage"
						type="file"
						onChange={handleUserSelectImg}
					/>
					<ActionIcon component="label" htmlFor="addImage">
						{getIcon("add-image", 25)}
					</ActionIcon>
					<ActionIcon onClick={() => setOpenEmoji((prev) => !prev)}>
						{getIcon("add-emoji", 25)}
					</ActionIcon>
				</Group>
				<Button onClick={addPostHandler}>Clove it</Button>
			</Group>
		</Modal>
	);
};
