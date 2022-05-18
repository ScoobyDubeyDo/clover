import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { useIcons } from "../../../../../../hooks";

export const Navlink = ({ label, username = "" }) => {
    const { pathname } = useLocation();
    const getIcon = useIcons();

    const isActive = pathname.slice(1) === label.toLowerCase();

    return (
        <Box
            component={Link}
            to={!!username ? "profile" : label.toLowerCase()}
            sx={(theme) => ({
                textDecoration: "none",
                width: "100%",
                "&:hover *": {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
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
                        <Avatar size="lg" src="https://i.pravatar.cc/100">
                            {getIcon("profile")}
                        </Avatar>
                    ) : isActive ? (
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
                            weight={isActive ? "bold" : "light"}>
                            {label}
                        </Text>
                        {!!username && (
                            <Text
                                size="sm"
                                sx={{ wordWrap: "anywhere" }}
                                lineClamp={1}
                                color="gray">
                                {username}
                            </Text>
                        )}
                    </Stack>
                </Group>
            </UnstyledButton>
        </Box>
    );
};
