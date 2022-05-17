import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
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
            color: "#ffffff",
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
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    colorScheme,
                    ...myTheme,
                }}
                defaultProps={{ ...defaultProps }}
                withGlobalStyles
                withNormalizeCSS>
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
};
