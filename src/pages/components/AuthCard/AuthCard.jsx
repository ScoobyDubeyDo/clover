import { Center, LoadingOverlay, Paper, Text, Title } from "@mantine/core";
import { useIcons, useThemeBreakpoint } from "../../../hooks";

const getTitle = (title) => {
    const temp = [];
    let i = 0;
    title.split(" ").forEach((word) => {
        if (word !== "Clover") {
            !!temp[i] ? (temp[i] = temp[i] + " " + word) : (temp[i] = word);
        } else {
            temp.push(word);
            i = i + 2;
        }
    });
    return [...temp];
};
export const AuthCard = ({ title, children }) => {
    const brand = useIcons("logo");
    const matches = useThemeBreakpoint("xs");
    return (
        <Center
            sx={(theme) => ({
                width: "100vw",
                height: "100vh",
                backgroundImage: `linear-gradient(30deg, ${theme.colors.blue[4]} 0%, ${theme.colors.lime[4]} 100%)`,
            })}
            p="md">
            <Paper
                sx={(theme) => ({
                    maxWidth: theme.breakpoints.sm,
                    position: "relative",
                })}
                shadow="xs"
                radius="xl"
                p="xl"
                withBorder>
                <Center>{brand}</Center>
                <LoadingOverlay
                    visible={false}
                    radius="xl"
                    overlayOpacity={0.8}
                    loaderProps={{
                        size: "xl",
                        color: "cyan",
                    }}
                />
                <Title
                    component={Text}
                    variant="gradient"
                    gradient={{ from: "blue", to: "lime", deg: 30 }}
                    order={1}
                    align="center"
                    sx={{
                        fontSize: matches ? 60 : 30,
                    }}
                    mx="xl">
                    {getTitle(title)[0]}
                    <Title
                        sx={{
                            fontFamily: "Handlee, cursive",
                            fontSize: "inherit",
                        }}
                        component="span"
                        order={1}>
                        {" "}
                        {getTitle(title)[1]}{" "}
                    </Title>
                    {getTitle(title)[2]}
                </Title>
                {children}
            </Paper>
        </Center>
    );
};
