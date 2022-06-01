import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Text, UnstyledButton } from "@mantine/core";
import {
	followUser,
	selectProfileData,
	setProfileData,
} from "../../../../../../app/slices";
import { useIcons } from "../../../../../../hooks";

export const UserCard = ({ uid, name, username, photoURL }) => {
	const avatar = useIcons("profile");
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
				minWidth: 150,
				maxWidth: 150,
				height: "100%",
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[6]
						: theme.colors.gray[2],
				borderRadius: "10px",
			})}>
			<Box
				sx={{
					display: "flex",
					height: "100%",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Avatar size="xl" ml="xs" src={photoURL}>
					{avatar}
				</Avatar>
				<Text
					transform="uppercase"
					align="center"
					sx={{
						width: "100%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					size="md">
					{name}
				</Text>
				<Text
					align="center"
					sx={{
						width: "100%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					size="sm"
					color="gray">
					{`@${username}`}
				</Text>
				<Button onClick={followUserHandler} size="sm" fullWidth compact>
					Follow
				</Button>
			</Box>
		</UnstyledButton>
	);
};
