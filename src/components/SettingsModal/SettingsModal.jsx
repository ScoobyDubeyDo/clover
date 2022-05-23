import {
	Button,
	Divider,
	Group,
	Popover,
	useMantineColorScheme,
} from "@mantine/core";
import { useAuthServices, useIcons } from "../../hooks";

export const SettingsModal = ({ target, opened, setOpened }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { handleSignOut } = useAuthServices();
	const getIcon = useIcons();
	return (
		<Popover
			ml="auto"
			transition="pop"
			radius="xl"
			opened={opened}
			onClose={() => setOpened(false)}
			target={target}
			position="top"
			withArrow>
			<Group position="center" spacing="xs">
				<Button
					onClick={() => toggleColorScheme()}
					variant="light"
					color="green"
					size="md"
					leftIcon={getIcon(colorScheme, 27)}>
					Change theme
				</Button>
				<Divider orientation="vertical" />
				<Button
					onClick={() => handleSignOut()}
					variant="light"
					size="md">
					logout
				</Button>
			</Group>
		</Popover>
	);
};
