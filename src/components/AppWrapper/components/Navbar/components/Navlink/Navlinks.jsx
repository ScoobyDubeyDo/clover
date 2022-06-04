import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { selectProfileData } from "../../../../../../app/slices";
import { useIcons } from "../../../../../../hooks";
import { SettingsModal } from "../../../../../SettingsModal/SettingsModal";

export const Navlink = ({ label, username = "", to = "" }) => {
	const { pathname } = useLocation();
	const getIcon = useIcons();
	const isActive =
		pathname === "/"
			? "home"
			: pathname.split("/")[1] === label.toLowerCase()
			? label.toLowerCase()
			: "";

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { avatarUrl } = useSelector(selectProfileData);
	const NavButton = (props) => {
		return (
			<Box
				{...props}
				sx={(theme) => ({
					textDecoration: "none",
					width: "100%",
					"&:hover *": {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[6]
								: theme.colors.gray[2],
					},
				})}>
				<UnstyledButton
					sx={(theme) => ({
						display: "block",
						width: !!username ? "100%" : "max-content",
						paddingBlock: theme.spacing.xs,
						paddingInline: theme.spacing.xl,
						borderRadius: theme.radius.xl,
					})}>
					<Group sx={{ flexWrap: "nowrap" }}>
						{!!username ? (
							<Avatar size="lg" src={avatarUrl}>
								{getIcon("profile")}
							</Avatar>
						) : isActive === label.toLowerCase() ? (
							getIcon(`${label}-filled`, 28)
						) : (
							getIcon(label, 28)
						)}
						<Stack sx={{ gap: 0 }}>
							<Text
								transform="uppercase"
								sx={{ wordWrap: "anywhere" }}
								lineClamp={1}
								size="md"
								weight={
									isActive === label.toLowerCase()
										? "bold"
										: "light"
								}>
								{label}
							</Text>
							{!!username && (
								<Text
									size="sm"
									sx={{ wordWrap: "anywhere" }}
									lineClamp={1}
									color="gray">
									{`@${username}`}
								</Text>
							)}
						</Stack>
					</Group>
				</UnstyledButton>
			</Box>
		);
	};

	if (!!username) {
		return (
			<SettingsModal
				setOpened={setIsModalOpen}
				opened={isModalOpen}
				target={<NavButton onClick={() => setIsModalOpen((o) => !o)} />}
			/>
		);
	}

	return <NavButton to={!!to ? to : label.toLowerCase()} component={Link} />;
};
