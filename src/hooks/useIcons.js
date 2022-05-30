import { AiOutlineComment, AiOutlineEdit, AiOutlineLink } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { GiLongAntennaeBug } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import {
	IoHeartOutline,
	IoHeartSharp,
	IoSettingsOutline,
	IoSunnySharp,
} from "react-icons/io5";
import {
	MdAddBox,
	MdBookmark,
	MdBookmarkBorder,
	MdExplore,
	MdOutlineAddBox,
	MdOutlineAddPhotoAlternate,
	MdOutlineAddReaction,
	MdOutlineDelete,
	MdOutlineExplore,
	MdOutlinePhotoCameraBack,
	MdOutlinePhotoCameraFront,
} from "react-icons/md";
import {
	RiHomeFill,
	RiHomeLine,
	RiMoonClearFill,
	RiSearch2Line,
	RiUserUnfollowLine,
} from "react-icons/ri";

export const useIcons = (iconName = "", size = 35) => {
	/***
	 * @param x
	 * @desc description
	 *
	 * @returns
	 *
	 */

	// js docs

	const getIcon = (name, size = 35) => {
		switch (name.toLowerCase()) {
			case "explore":
				return <MdOutlineExplore size={size} />;
			case "home":
				return <RiHomeLine size={size} />;
			case "post":
				return <MdOutlineAddBox size={size} />;
			case "profile":
				return <BiUserCircle size={size} />;
			case "saved":
				return <MdBookmarkBorder size={size} />;
			case "search":
				return <RiSearch2Line size={size} />;
			case "logo":
				return <BrandLogo size={size} />;
			case "menu":
				return <BsThreeDots size={size} />;
			case "edit":
				return <AiOutlineEdit size={size} />;
			case "delete":
				return <MdOutlineDelete size={size} />;
			case "link":
				return <AiOutlineLink size={size} />;
			case "like":
				return <IoHeartOutline size={size} />;
			case "comment":
				return <AiOutlineComment size={size} />;
			case "dark":
				return <IoSunnySharp size={size} />;
			case "light":
				return <RiMoonClearFill size={size} />;
			case "settings":
				return <IoSettingsOutline size={size} />;
			case "add-image":
				return <MdOutlineAddPhotoAlternate size={size} />;
			case "add-emoji":
				return <MdOutlineAddReaction size={size} />;
			case "close":
				return <IoIosClose size={size} />;
			case "unfollow":
				return <RiUserUnfollowLine size={size} />;
			case "send":
				return <FiSend size={size} />;
			case "banner-camera":
				return <MdOutlinePhotoCameraBack size={size} />;
			case "avatar-camera":
				return <MdOutlinePhotoCameraFront size={size} />;
			case "like-filled":
				return <IoHeartSharp size={size} />;
			case "explore-filled":
				return <MdExplore size={size} />;
			case "home-filled":
				return <RiHomeFill size={size} />;
			case "post-filled":
				return <MdAddBox size={size} />;
			case "profile-filled":
				return <HiUserCircle size={size} />;
			case "saved-filled":
				return <MdBookmark size={size} />;

			default:
				return <GiLongAntennaeBug color="red" size={size} />;
		}
	};

	return !!iconName ? getIcon(iconName, size) : getIcon;
};

const BrandLogo = () => {
	return (
		<svg
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="29.894px"
			height="29.895px"
			viewBox="0 0 29.894 29.895">
			<defs>
				<linearGradient id="lgrad" x1="21%" y1="100%" x2="79%" y2="0%">
					<stop offset="0%" stopColor="#4dabf7" />
					<stop offset="100%" stopColor="#a9e34b" />
				</linearGradient>
			</defs>
			<g fill="url('#lgrad')">
				<g>
					<g id="Icons_7_">
						<g>
							<path
								d="M14.308,13.048c0.355,0.35,0.924,0.35,1.28,0c1.22-1.203,3.813-3.803,4.451-4.792c0.908-1.406,1.812-2.566,1.812-4.591
					S20.211,0,18.186,0c-1.416,0-2.63,0.812-3.24,1.987C14.336,0.812,13.123,0,11.707,0C9.682,0,8.042,1.64,8.042,3.665
					S8.947,6.85,9.854,8.256C10.495,9.244,13.088,11.845,14.308,13.048z"
							/>
							<path
								d="M15.587,16.848c-0.355-0.351-0.925-0.351-1.28,0c-1.22,1.202-3.813,3.804-4.452,4.791
					c-0.907,1.406-1.813,2.566-1.813,4.593c0,2.023,1.64,3.663,3.665,3.663c1.416,0,2.63-0.812,3.24-1.985
					c0.611,1.175,1.824,1.985,3.24,1.985c2.024,0,3.665-1.64,3.665-3.663c0-2.025-0.904-3.187-1.812-4.593
					C19.402,20.65,16.807,18.049,15.587,16.848z"
							/>
							<path
								d="M27.908,14.947c1.174-0.61,1.985-1.824,1.985-3.24c0-2.025-1.64-3.665-3.664-3.666c-2.024,0-3.186,0.906-4.592,1.813
					c-0.987,0.639-3.59,3.232-4.792,4.452c-0.351,0.355-0.351,0.924,0,1.279c1.202,1.22,3.805,3.813,4.792,4.453
					c1.406,0.907,2.566,1.812,4.592,1.812c2.023,0,3.664-1.642,3.664-3.666C29.896,16.771,29.083,15.557,27.908,14.947z"
							/>
							<path
								d="M13.048,15.587c0.35-0.354,0.35-0.925,0-1.28c-1.203-1.22-3.804-3.813-4.792-4.452C6.851,8.948,5.69,8.042,3.667,8.042
					c-2.025,0-3.665,1.641-3.665,3.666c0,1.416,0.813,2.63,1.987,3.24c-1.175,0.61-1.987,1.823-1.987,3.239
					c0,2.023,1.64,3.663,3.665,3.665c2.024,0,3.185-0.905,4.59-1.812C9.245,19.4,11.845,16.807,13.048,15.587z"
							/>
						</g>
					</g>
				</g>
			</g>
		</svg>
	);
};
