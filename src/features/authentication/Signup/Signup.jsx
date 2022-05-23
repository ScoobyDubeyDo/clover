import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Anchor,
	Box,
	Button,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useAuthServices, useThemeBreakpoint } from "../../../hooks";
import { AuthCard } from "../../components/AuthCard/AuthCard";

export const Signup = () => {
	const matches = useThemeBreakpoint("xs");
	const { handleSignUp } = useAuthServices();
	const [inputFieldsValue, setInputFieldsValue] = useState({
		fullName: "",
		email: "",
		password: "",
		username: "",
	});

	const handleInput = (e, fieldName = "") => {
		if (!!fieldName) {
			setInputFieldsValue((prev) => {
				return {
					...prev,
					[fieldName]: e.target.value,
				};
			});
		} else {
			setInputFieldsValue({
				fullName: "",
				email: "",
				password: "",
				username: "",
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSignUp({ ...inputFieldsValue });
		// hack
		handleInput(e);
		// hack
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
			<Box component="form" m={matches && "lg"} onSubmit={handleSubmit}>
				<TextInput
					value={inputFieldsValue.fullName}
					onChange={(e) => handleInput(e, "fullName")}
					placeholder="Your name"
					label="Full name"
					size="md"
					type="text"
					required
				/>
				<TextInput
					value={inputFieldsValue.username}
					onChange={(e) => handleInput(e, "username")}
					placeholder="username"
					label="Username"
					size="md"
					type="text"
					required
				/>
				<TextInput
					value={inputFieldsValue.email}
					onChange={(e) => handleInput(e, "email")}
					placeholder="your email"
					label="Email Id"
					size="md"
					type="email"
					required
				/>
				<PasswordInput
					value={inputFieldsValue.password}
					onChange={(e) => handleInput(e, "password")}
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
