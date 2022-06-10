import { Link } from "react-router-dom";
import {
	Anchor,
	Box,
	Button,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import {
	useAuthServices,
	useFormHandler,
	useThemeBreakpoint,
} from "../../../hooks";
import { AuthCard } from "../../components/AuthCard/AuthCard";

export const Signup = () => {
	const matches = useThemeBreakpoint("xs");
	const { handleSignUp } = useAuthServices();
	const form = useFormHandler("signup");

	const handleSubmit = (values) => {
		handleSignUp({ ...values });
	};
	return (
		<AuthCard title="Join Clover today">
			<Text
				sx={(theme) => ({
					fontSize: matches ? 28 : 18,
					maxWidth: theme.breakpoints.xs,
				})}
				align="center"
				mx="auto">
				Sign up to see photos and videos from your friends.
			</Text>
			<Box
				noValidate={true}
				component="form"
				m={matches && "lg"}
				onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					placeholder="Your name"
					label="Full name"
					size="md"
					type="text"
					required
					{...form.getInputProps("fullName")}
				/>
				<TextInput
					{...form.getInputProps("username")}
					placeholder="username"
					label="Username"
					size="md"
					type="text"
					required
				/>
				<TextInput
					{...form.getInputProps("email")}
					placeholder="your email"
					label="Email Id"
					size="md"
					type="email"
					required
				/>
				<PasswordInput
					{...form.getInputProps("password")}
					placeholder="password"
					label="Password"
					size="md"
					required
				/>
				<Button fullWidth mt="xl" type="submit" compact size="xl">
					Sign up
				</Button>
				<Text lineClamp={1} mx="auto" mt="sm" size="lg">
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
