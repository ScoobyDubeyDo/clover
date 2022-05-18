import {
    Anchor,
    Avatar,
    Button,
    Divider,
    Group,
    Image,
    Paper,
    Stack,
    Text,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { useThemeBreakpoint } from "../../../../hooks";

export const UserProfileInfo = ({ children }) => {
    const mdMatches = useThemeBreakpoint("md");
    const xsMatches = useThemeBreakpoint("xs");
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    return (
        <>
            <Image
                withPlaceholder
                mx="-1rem"
                mt="-1rem"
                height={mdMatches ? 300 : 200}
                fit="cover"
                src="https://picsum.photos/1200/700"
                alt="user cover"
            />
            <Stack sx={{ gap: "0.5rem" }}>
                <Group
                    p="xs"
                    sx={{
                        position: "relative",
                        height: "4rem",
                        backgroundColor: "n",
                    }}>
                    <Paper
                        p={2}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            borderRadius: "50%",
                            width: xsMatches ? "25%" : 100,
                            maxWidth: 200,
                        }}>
                        <Avatar src="https://i.pravatar.cc/165" size="100%" alt="user profile" />
                    </Paper>
                    <Button ml="auto" size="sm" color={isDark ? "gray" : "dark"} variant="outline">
                        Edit profile
                    </Button>
                </Group>
                <Stack
                    sx={{
                        gap: 0,
                        width: "100%",
                    }}>
                    <Title
                        component={Text}
                        lineClamp={1}
                        order={2}
                        sx={{
                            wordWrap: "anywhere",
                        }}>
                        Asdd asdssdasds
                    </Title>
                    <Text color="dimmed" lineClamp={1}>
                        @sdsdas-asds
                    </Text>
                </Stack>
                <Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit quod labore,
                    eum quas laudantium irum.
                </Text>
                <Anchor>twitter.com/ScoobyDubeyDo</Anchor>
                <Group position="left">
                    <Text>
                        <Text component="span" weight="bold">
                            12
                        </Text>
                        &nbsp; Cloves&nbsp;
                    </Text>
                    <Text
                        sx={{
                            "&:hover , &:hover *": {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        }}>
                        <Text component="span" weight="bold">
                            128
                        </Text>
                        &nbsp; Following
                    </Text>
                    <Text
                        sx={{
                            "&:hover , &:hover *": {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        }}>
                        <Text component="span" weight="bold">
                            73
                        </Text>
                        &nbsp; Followers
                    </Text>
                </Group>
                <Divider mt="md" mb="lg" />
            </Stack>
            {children}
        </>
    );
};
