import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const commonSchemaObject = {
	email: z
		.string({
			required_error: "Email is required",
		})
		.email({ message: "Invalid email address" }),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, { message: "Password should have at least 8 letters" }),
};
const commonInitialValues = {
	email: "",
	password: "",
};
const signupSchemaObject = {
	fullName: z
		.string({
			required_error: "Full Name is required",
			invalid_type_error: "Full Name must be a string",
		})
		.min(2, { message: "Full Name should have at least 2 letters" }),
	username: z
		.string({
			required_error: "Username is required",
		})
		.min(8, { message: "Username should have at least 8 letters" }),
};
const signupInitialValues = {
	fullName: "",
	username: "",
};

export const useFormHandler = (type = "") => {
	const schema = z.object(
		type === "signup"
			? { ...commonSchemaObject, ...signupSchemaObject }
			: type === "signin"
			? { ...commonSchemaObject }
			: {}
	);
	const form = useForm({
		schema: zodResolver(schema),
		initialValues:
			type === "signup"
				? { ...commonInitialValues, ...signupInitialValues }
				: type === "signin"
				? { ...commonInitialValues }
				: {},
	});

	return form;
};
