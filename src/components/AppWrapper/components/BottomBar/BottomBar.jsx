import { ActionIcon, Button, Footer, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { useThemeBreakpoint } from "../../../../hooks";
import { useIcons } from "../../../../hooks/useIcons";

export const BottomBar = () => {
    const getIcon = useIcons();
    const matches = useThemeBreakpoint("xs");

    return (
        <Footer
            component="nav"
            height={matches ? 0 : 80}
            p="md"
            sx={(theme) => ({
                display: "block",
                [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
                    display: "none",
                },
            })}
        >
            <Group
                position="center"
                spacing="xl"
                grow
                sx={{ flexWrap: "nowrap" }}
            >
                <ActionIcon component={NavLink} to="/home">
                    {({ isActive }) =>
                        isActive ? getIcon("home-active") : getIcon("home")
                    }
                </ActionIcon>
                <ActionIcon component={NavLink} to="/explore">
                    {({ isActive }) =>
                        isActive
                            ? getIcon("explore-active")
                            : getIcon("explore")
                    }
                </ActionIcon>
                <Button component={ActionIcon} compact>
                    {getIcon("post")}
                </Button>
                <ActionIcon component={NavLink} to="/saved">
                    {({ isActive }) =>
                        isActive ? getIcon("saved-active") : getIcon("saved")
                    }
                </ActionIcon>
                <ActionIcon component={NavLink} to="/profile">
                    {({ isActive }) =>
                        isActive
                            ? getIcon("profile-active")
                            : getIcon("profile")
                    }
                </ActionIcon>
            </Group>
        </Footer>
    );
};
