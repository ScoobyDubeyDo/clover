import { Link } from "react-router-dom";
import { Anchor, Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useThemeBreakpoint } from "../../hooks";
import { AuthCard } from "../components";

export const Signin = () => {
    const matches = useThemeBreakpoint("xs");
    return (
        <AuthCard title="Sign in to Clover">
            <Box component="form" m={matches ? "lg" : undefined}>
                <TextInput
                    placeholder="email / username"
                    label="Email or username"
                    size="md"
                    type="text"
                    required
                />
                <PasswordInput placeholder="Password" label="Password" size="md" required />
                <Button fullWidth mt="xl" compact size="xl">
                    Sign in
                </Button>
                <Text lineClamp={1} align="center" mt="sm" size={matches ? "lg" : "md"}>
                    Don't have an account?{" "}
                    <Anchor
                        component={Link}
                        to="/sign-up"
                        variant="gradient"
                        gradient={{ from: "blue", to: "lime", deg: 30 }}
                        weight="bolder"
                        underline>
                        Sign up
                    </Anchor>
                </Text>
            </Box>
        </AuthCard>
    );
};
