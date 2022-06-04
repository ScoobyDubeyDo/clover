import { useEffect, useState } from "react";
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
import { AuthCard } from "../../components";
import { GuestUsers } from "./components";

export const Signin = () => {
	const matches = useThemeBreakpoint("xs");
	const { handleSignIn } = useAuthServices();
	const [guestAcc, setGuestAcc] = useState("");

	const [inputFieldsValue, setInputFieldsValue] = useState({
		email: "",
		password: "",
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
				email: "",
				password: "",
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSignIn({
			email: inputFieldsValue.email,
			password: inputFieldsValue.password,
		});
		handleInput(e);
	};

	useEffect(() => {
		if (!!guestAcc) {
			handleInput({ target: { value: guestAcc } }, "email");
			handleInput({ target: { value: "zzzzzzzz" } }, "password");
		}
	}, [guestAcc]);

	return (
		<AuthCard title="Sign in to Clover">
			<Box component="form" m={matches && "lg"} onSubmit={handleSubmit}>
				<TextInput
					value={inputFieldsValue.email}
					onChange={(e) => handleInput(e, "email")}
					placeholder="email"
					label="Email"
					size="md"
					type="text"
					required
				/>
				<PasswordInput
					value={inputFieldsValue.password}
					onChange={(e) => handleInput(e, "password")}
					placeholder="Password"
					label="Password"
					size="md"
					required
				/>

				<GuestUsers value={guestAcc} setValue={setGuestAcc} />
				<Button type="submit" fullWidth mt="xl" compact size="xl">
					Sign in
				</Button>
				<Text
					lineClamp={1}
					align="center"
					mx="auto"
					mt="sm"
					size={matches ? "lg" : "md"}>
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
