import { Button, Popover, Stack, useMantineColorScheme } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import { useAuthServices, useIcons } from "../../hooks";

export const SettingsModal = ({ target, opened, setOpened }) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { handleSignOut } = useAuthServices();
	const getIcon = useIcons();

	useWindowEvent("scroll", () => setOpened(false));

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
			<Stack position="center" spacing="lg">
				<Button
					onClick={() => toggleColorScheme()}
					variant="light"
					color="green"
					size="md"
					leftIcon={getIcon(colorScheme, 27)}>
					Change theme
				</Button>
				<Button
					onClick={() => handleSignOut()}
					variant="light"
					size="md">
					logout
				</Button>
			</Stack>
		</Popover>
	);
};
