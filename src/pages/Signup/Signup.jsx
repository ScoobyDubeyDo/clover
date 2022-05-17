import { Link } from "react-router-dom";
import { Anchor, Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useThemeBreakpoint } from "../../hooks";
import { AuthCard } from "../components/AuthCard/AuthCard";

export const Signup = () => {
    const matches = useThemeBreakpoint("xs");

    return (
        <AuthCard title="Join Clover today">
            <Text
                sx={(theme) => ({
                    fontSize: matches ? 28 : 18,
                    maxWidth: theme.breakpoints.xs,
                })}
                align="center">
                Sign up to see photos and videos from your friends.
            </Text>
            <Box component="form" m={matches ? "lg" : undefined}>
                <TextInput
                    placeholder="Your name"
                    label="Full name"
                    size="md"
                    type="text"
                    required
                />
                <TextInput placeholder="username" label="Username" size="md" type="text" required />
                <TextInput
                    placeholder="your email"
                    label="Email Id"
                    size="md"
                    type="email"
                    required
                />
                <PasswordInput placeholder="password" label="Username" size="md" required />
                <Button fullWidth mt="xl" type="submit" compact size="xl">
                    Sign up
                </Button>
                <Text lineClamp={1} align="center" mt="sm" size="lg">
                    Already have an account?{" "}
                    <Anchor
                        component={Link}
                        to="/sign-in"
                        variant="gradient"
                        gradient={{ from: "blue", to: "lime", deg: 30 }}
                        weight="bolder"
                        underline>
                        Sign in
                    </Anchor>
                </Text>
            </Box>
        </AuthCard>
    );
};
