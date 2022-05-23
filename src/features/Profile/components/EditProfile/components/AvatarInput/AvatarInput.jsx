import { useState } from "react";
import { useSelector } from "react-redux";
import {
	AspectRatio,
	Avatar,
	Center,
	Input,
	LoadingOverlay,
	Paper,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { selectProfileData } from "../../../../../../app/slices";
import { useIcons, useThemeBreakpoint } from "../../../../../../hooks";

export const AvatarInput = ({ handleInput }) => {
	const { hovered, ref } = useHover();
	const matches = useThemeBreakpoint("md");
	const getIcon = useIcons();
	const { avatarUrl } = useSelector(selectProfileData);
	const [avatarImg, setAvatarImg] = useState(avatarUrl);

	const avatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarImg(URL.createObjectURL(e.target.files[0]));
			handleInput({
				avatarUrl: file,
			});
		}
	};

	return (
		<Center
			sx={{
				position: "relative",
				height: "4rem",
			}}>
			<Paper
				ref={ref}
				p={3}
				sx={{
					position: "absolute",
					bottom: 0,
					borderRadius: "50%",
					width: matches ? "30%" : 130,
					maxWidth: 200,
					zIndex: 401,
				}}>
				<label
					style={{
						cursor: "pointer",
					}}
					htmlFor="avatarImage">
					<LoadingOverlay
						visible={hovered}
						overlayOpacity={0.5}
						radius="50%"
						loader={getIcon("avatar-camera")}
					/>
					<Input
						sx={{ display: "none" }}
						accept="image/*"
						id="avatarImage"
						type="file"
						onChange={avatarChange}
					/>
					<AspectRatio ratio={1 / 1}>
						<Avatar
							src={avatarImg}
							size="100%"
							alt="user profile"
						/>
					</AspectRatio>
				</label>
			</Paper>
		</Center>
	);
};
