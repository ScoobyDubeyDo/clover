import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useThemeBreakpoint = (breakpoint, max = false) => {
    const { breakpoints } = useMantineTheme();
    const matches = useMediaQuery(
        `(${max ? "max" : "min"}-width: ${breakpoints[breakpoint]}px)`
    );

    return matches;
};
