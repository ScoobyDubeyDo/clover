import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Center,
	LoadingOverlay,
	Modal,
	TextInput,
	Textarea,
} from "@mantine/core";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
	selectProfileData,
	setProfileData,
} from "../../../../../../app/slices";
import { db, storage } from "../../../../../../firebase";
import { AvatarInput, BannerInput } from "./components";

export const EditProfile = ({ opened, setOpened }) => {
	const { bannerUrl, avatarUrl, bio, website, fullName, uid } =
		useSelector(selectProfileData);

	const [isLoading, setIsLoading] = useState(false);

	const [inputValues, setInputValues] = useState({
		fullName,
		bio,
		website,
		bannerUrl,
		avatarUrl,
	});
	const dispatch = useDispatch();

	const handleInput = (inputPair) => {
		setInputValues((prev) => {
			return {
				...prev,
				...inputPair,
			};
		});
	};

	const handleDataSubmit = async () => {
		setIsLoading(true);
		let avatarDownloadURL = inputValues.avatarUrl;
		let bannerDownloadURL = inputValues.bannerUrl;
		if (typeof avatarDownloadURL === "object") {
			const avatarRef = ref(storage, `${uid}/avatar`);
			const avatarSnapshot = await uploadBytes(
				avatarRef,
				inputValues.avatarUrl
			);
			avatarDownloadURL = await getDownloadURL(avatarSnapshot.ref);
		}
		if (typeof bannerDownloadURL === "object") {
			const bannerRef = ref(storage, `${uid}/banner`);
			const bannerSnapshot = await uploadBytes(
				bannerRef,
				inputValues.bannerUrl
			);
			bannerDownloadURL = await getDownloadURL(bannerSnapshot.ref);
		}
		const userRef = doc(collection(db, "users"), uid);
		await updateDoc(userRef, {
			...inputValues,
			avatarUrl: avatarDownloadURL,
			bannerUrl: bannerDownloadURL,
		});
		dispatch(
			setProfileData({
				...inputValues,
				avatarUrl: avatarDownloadURL,
				bannerUrl: bannerDownloadURL,
			})
		);
		setOpened(false);
		setIsLoading(false);
	};

	return (
		<Modal
			padding={20}
			opened={opened}
			withinPortal={true}
			radius="md"
			size="lg"
			transition="pop"
			centered
			withCloseButton={false}
			onClose={() => {
				setOpened(false);
				setInputValues({
					fullName,
					bio,
					website,
					bannerUrl,
					avatarUrl,
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
			<BannerInput handleInput={handleInput} />
			<AvatarInput handleInput={handleInput} />
			<Box>
				<TextInput
					value={inputValues.fullName}
					autoFocus={false}
					placeholder="Your name"
					label="Full name"
					onChange={(e) => handleInput({ fullName: e.target.value })}
				/>
				<Textarea
					value={inputValues.bio}
					placeholder="Something about you"
					autoFocus={false}
					label="Your Bio"
					autosize
					minRows={2}
					maxRows={4}
					radius="lg"
					onChange={(e) => handleInput({ bio: e.target.value })}
				/>
				<TextInput
					value={inputValues.website}
					autoFocus={false}
					placeholder="Enter link here"
					label="Website"
					onChange={(e) => handleInput({ website: e.target.value })}
				/>
			</Box>
			<Center mt="lg">
				<Button size="md" onClick={handleDataSubmit}>
					Save Changes
				</Button>
			</Center>
		</Modal>
	);
};
