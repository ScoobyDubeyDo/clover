import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mantine/core";
import {
	followUser,
	selectAllUsers,
	selectProfileData,
	setProfileData,
	unFollowUser,
} from "../../../../../../app/slices";
import { UserDetailsButton } from "../UserDetailsButton/UserDetailsButton";

export const FollowingModal = ({ opened, setOpened, followingList }) => {
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
			overflow="inside"
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
			{followingList.includes(currentUser?.uid) && (
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
					if (followingList.includes(uid)) {
						const isFollowing = followers.includes(
							currentUser?.uid
						);
						return (
							<UserDetailsButton
								setOpened={setOpened}
								key={uid}
								username={username}
								unFollowUserHandler={unFollowUserHandler}
								uid={uid}
								isFollowing={isFollowing}
								fullName={fullName}
								avatarUrl={avatarUrl}
								followUserHandler={followUserHandler}
							/>
						);
					}
					return undefined;
				}
			)}
		</Modal>
	);
};
