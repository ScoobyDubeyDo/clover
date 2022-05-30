import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ActionIcon,
	Avatar,
	Button,
	Group,
	LoadingOverlay,
	Modal,
	Stack,
	Text,
	Textarea,
	useMantineTheme,
} from "@mantine/core";
import AmazingEmojiPicker from "amazing-react-emojipicker";
import { editPost, selectProfileData } from "../../app/slices";
import { useIcons } from "../../hooks";

export const EditPostModal = ({ opened, setOpened, postId, text }) => {
	const getIcon = useIcons();
	const inputRef = useRef();
	const { colorScheme } = useMantineTheme();
	const [openEmoji, setOpenEmoji] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { avatarUrl, username, fullName } = useSelector(selectProfileData);
	const dispatch = useDispatch();

	const updatePostHandler = async () => {
		setIsLoading(true);
		dispatch(editPost({ postId, postText: inputRef.current.value }));
		setOpened(false);
		setIsLoading(false);
	};

	useEffect(() => {
		if (!!inputRef.current) {
			inputRef.current.value = text;
		}
	}, [text]);

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
				defaultValue={text}
				autoFocus
				ref={inputRef}
				placeholder="What are you thinking...."
				autosize
				minRows={6}
				maxRows={6}
				radius="lg"
				size="xl"
			/>
			<AmazingEmojiPicker
				darkMode={colorScheme === "dark" ? true : false}
				ref={inputRef}
				visibility={openEmoji}
				setVisibility={setOpenEmoji}
				top={350}
			/>
			<Group position="apart" mt="sm">
				<Group>
					<ActionIcon onClick={() => setOpenEmoji((prev) => !prev)}>
						{getIcon("add-emoji", 25)}
					</ActionIcon>
				</Group>
				<Button onClick={updatePostHandler}>Edit Clove</Button>
			</Group>
		</Modal>
	);
};
