import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Avatar,
	Button,
	Group,
	Modal,
	Stack,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	followUser,
	selectAllUsers,
	selectProfileData,
	setProfileData,
	unFollowUser,
} from "../../../../../../app/slices";
import { useIcons } from "../../../../../../hooks";
import { UserDetailsButton } from "../UserDetailsButton/UserDetailsButton";

export const FollowersModal = ({ opened, setOpened, followersList }) => {
	const avatar = useIcons("profile");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const allUsers = useSelector(selectAllUsers);
	const currentUser = useSelector(selectProfileData);
	const { following } = currentUser;

	const unFollowUserHandler = (e, uid) => {
		e.stopPropagation();
		dispatch(
			unFollowUser({
				currentUserID: currentUser?.uid,
				followedUserID: uid,
			})
		);
		dispatch(
			setProfileData({
				following: [
					...currentUser.following.filter((ele) => ele !== uid),
				],
			})
		);
		if (following.length === 1) {
			setOpened(false);
		}
	};

	const followUserHandler = (e, uid) => {
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
		if (following.length === 1) {
			setOpened(false);
		}
	};

	return (
		<Modal
			size="lg"
			padding={20}
			opened={opened}
			withinPortal={true}
			radius="md"
			transition="pop"
			centered
			title="Following"
			onClose={() => {
				setOpened(false);
			}}>
			{followersList.includes(currentUser?.uid) && (
				<UserDetailsButton
					isCurrentUser
					setOpened={setOpened}
					username={currentUser?.username}
					uid={currentUser?.uid}
					fullName={currentUser?.fullName}
					avatarUrl={currentUser?.avatarUrl}
				/>
			)}
			{allUsers.map(
				({ uid, fullName, avatarUrl, username, followers }) => {
					if (followersList.includes(uid)) {
						const isFollowing = followers.includes(
							currentUser?.uid
						);
						return (
							<UserDetailsButton
								key={uid}
								username={username}
								unFollowUserHandler={unFollowUserHandler}
								uid={uid}
								setOpened={setOpened}
								fullName={fullName}
								isFollowing={isFollowing}
								followUserHandler={followUserHandler}
								avatarUrl={avatarUrl}
							/>
						);
					}
				}
			)}
		</Modal>
	);
};
