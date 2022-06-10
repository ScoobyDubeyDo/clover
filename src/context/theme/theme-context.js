import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

const myTheme = {
	fontFamily: "Quicksand, sans-serif",
	headings: {
		fontFamily: "Quicksand, sans-serif",
	},
	loader: "bars",
	white: "#f1f5f9",
	black: "#212121",
	colors: {
		blue: [
			"#e1f5fe",
			"#b3e5fc",
			"#81d4fa",
			"#4fc3f7",
			"#29b6f6",
			"#03a9f4",
			"#039be5",
			"#0288d1",
			"#0277bd",
			"#01579b",
		],
	},
	primaryShade: 4,
};

const defaultProps = {
	ActionIcon: {
		radius: "xl",
		size: "xl",
	},
	Button: {
		radius: "xl",
		variant: "gradient",
		gradient: { from: "blue", to: "lime", deg: 30 },
		sx: {
			fontFamily: "Handlee, cursive",
		},
	},
	Input: {
		radius: "xl",
	},
	InputWrapper: {
		mt: "sm",
		labelProps: {
			style: { color: "inherit" },
		},
	},
	Paper: { withBorder: true },
	Avatar: {
		radius: "50%",
		color: "blue",
	},
	Text: {
		sx: { width: "fit-content" },
	},

	Group: {
		noWrap: true,
		position: "apart",
	},
};

const styles = {
	Button: {
		gradient: {
			color: "#ffffff",
		},
	},
};

const globalStyles = {
	"*:not(textarea):not(input)": {
		userSelect: "none",
	},
	"*,*::after ,*::before": {
		scrollbarWidth: "thin",
	},
	"::-webkit-scrollbar": {
		width: "0.5rem",
	},

	"::-webkit-scrollbar-thumb": {
		background: "gray",
		borderRadius: "25px",
	},
};

export const ThemeProvider = ({ children }) => {
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: "theme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<>
			<Global styles={{ ...globalStyles }} />
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{
						colorScheme,
						...myTheme,
					}}
					defaultProps={{ ...defaultProps }}
					styles={{ ...styles }}
					withGlobalStyles
					withNormalizeCSS>
					{children}
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
};
