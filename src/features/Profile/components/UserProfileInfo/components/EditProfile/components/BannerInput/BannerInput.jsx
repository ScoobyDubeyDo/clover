import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Image, Input, LoadingOverlay } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { selectProfileData } from "../../../../../../../../app/slices";
import { useIcons, useThemeBreakpoint } from "../../../../../../../../hooks";

export const BannerInput = ({ handleInput }) => {
	const { hovered, ref } = useHover();
	const matches = useThemeBreakpoint("md");
	const getIcon = useIcons();

	const { bannerUrl } = useSelector(selectProfileData);
	const [bannerImg, setBannerImg] = useState(bannerUrl);

	const bannerChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setBannerImg(URL.createObjectURL(e.target.files[0]));
			handleInput({
				bannerUrl: file,
			});
		}
	};

	return (
		<Box
			ref={ref}
			mx={-20}
			mt={-20}
			sx={{
				position: "relative",
				height: matches ? 300 : 200,
			}}>
			<label
				style={{
					cursor: "pointer",
				}}
				htmlFor="bannerImage">
				<Input
					sx={{ display: "none" }}
					accept="image/*"
					id="bannerImage"
					type="file"
					onChange={bannerChange}
				/>
				<Image
					withPlaceholder
					radius="md"
					height={matches ? 300 : 200}
					fit="cover"
					src={bannerImg}
					alt="user cover"
				/>
				<LoadingOverlay
					visible={hovered}
					overlayOpacity={0.5}
					loader={getIcon("banner-camera")}
				/>
			</label>
		</Box>
	);
};
