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
import {
	useAuthServices,
	useFormHandler,
	useThemeBreakpoint,
} from "../../../hooks";
import { AuthCard } from "../../components";
import { GuestUsers } from "./components";

export const Signin = () => {
	const matches = useThemeBreakpoint("xs");
	const { handleSignIn } = useAuthServices();
	const [guestAcc, setGuestAcc] = useState("");
	const form = useFormHandler("signin");

	const handleSubmit = (values) => {
		console.log(values);
		handleSignIn({
			...values,
		});
	};

	useEffect(() => {
		if (!!guestAcc) {
			form.setValues({
				email: guestAcc,
				password: "zzzzzzzz",
			});
		}
	}, [guestAcc]);

	return (
		<AuthCard title="Sign in to Clover">
			<Box
				noValidate={true}
				component="form"
				m={matches && "lg"}
				onSubmit={form.onSubmit(handleSubmit)}>
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
