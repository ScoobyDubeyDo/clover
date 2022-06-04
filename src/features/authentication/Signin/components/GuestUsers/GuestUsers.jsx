import { forwardRef } from "react";
import { Avatar, Group, Select, Text } from "@mantine/core";
import { useThemeBreakpoint } from "../../../../../hooks";

const data = [
	{
		image: "",
		label: "Tester OP",
		value: "test@test.com",
	},
	{
		image: "https://i.pravatar.cc/150?img=12",
		label: "Dhruv Hayre",
		value: "dhruv@gmail.com",
		disabled: true,
	},

	{
		image: "https://i.pravatar.cc/150?img=2",
		label: "Chhavi Padmanabhan",
		value: "padmanabhan@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=54",
		label: "Karthik Dewan",
		value: "dewan.kartik@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=14",
		label: "Om Chauhan",
		value: "om_chauhan111@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=34",
		label: "Chanda kumari",
		value: "kumari@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=30",
		label: "Minakshi Bhasin",
		value: "minakshi1998@gmail.com",
		disabled: true,
	},
	{
		image: "https://images.unsplash.com/photo-1535549977853-e4fa009a5662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
		label: "Agampreet Dhillon",
		value: "agampreet@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=59",
		label: "Rudra Murthy",
		value: "rudra@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=42",
		label: "Tanvi Nanda",
		value: "nanda.tanvi2218@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=62",
		label: "Rey Sarraf",
		value: "sarraf@gmail.com",
		disabled: true,
	},
	{
		image: "https://i.pravatar.cc/150?img=43",
		label: "Anika Nayak",
		value: "nayan@gmail.com",
		disabled: true,
	},
];

const SelectItem = forwardRef(
	({ image, label, description, ...others }, ref) => {
		const matches = useThemeBreakpoint("xs");

		return (
			<div ref={ref} {...others}>
				<Group noWrap mx={matches ? "xl" : "xs"}>
					<Avatar size={matches ? "lg" : "md"} src={image} />
					<div>
						<Text size={matches ? "xl" : "xs"}>{label}</Text>
					</div>
				</Group>
			</div>
		);
	}
);

const getIcon = (email) => {
	return data.find((item) => item.value === email)?.image || "";
};

export const GuestUsers = ({ value, setValue }) => {
	const matches = useThemeBreakpoint("xs");
	return (
		<Select
			label="Choose guest account to login"
			placeholder="Pick one"
			value={value}
			withinPortal
			searchable
			clearable
			transition="pop"
			onChange={setValue}
			itemComponent={SelectItem}
			data={data}
			iconWidth={40}
			nothingFound="That person is not a guest anymore"
			icon={<Avatar size="90%" src={getIcon(value)} />}
			maxDropdownHeight={matches ? 300 : 250}
			filter={(value, item) =>
				item.label.toLowerCase().includes(value.toLowerCase().trim())
			}
		/>
	);
};
