import {
    Avatar,
    Button,
    Group,
    Stack,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { useIcons, useThemeBreakpoint } from "../../../../../../hooks";

export const UserChip = ({ name, username, photoURL }) => {
    const avatar = useIcons("profile");
    const matches = useThemeBreakpoint("lg");
    return (
        <UnstyledButton
            component="div"
            sx={(theme) => ({
                display: "block",
                padding: theme.spacing.xs,
                width: "100%",
                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[2],
                },
            })}
        >
            <Group sx={{ flexWrap: "nowrap" }}>
                <Avatar color="blue" src={photoURL} radius="xl">
                    {avatar}
                </Avatar>
                <Stack sx={{ gap: 0 }}>
                    <Text
                        transform="uppercase"
                        sx={{ wordWrap: "anywhere" }}
                        lineClamp={1}
                        size="md"
                    >
                        {name}
                    </Text>
                    <Text
                        sx={{ wordWrap: "anywhere" }}
                        size="sm"
                        lineClamp={1}
                        color="gray"
                    >
                        {username}
                    </Text>
                </Stack>
                {matches && (
                    <Button size="sm" compact>
                        Follow
                    </Button>
                )}
            </Group>
        </UnstyledButton>
    );
};
