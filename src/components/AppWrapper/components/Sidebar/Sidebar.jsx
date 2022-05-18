import { Aside, MediaQuery, Paper, ScrollArea, Title } from "@mantine/core";
import { UserChip } from "./components";

export const Sidebar = () => {
    return (
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="md" width={{ md: 250, lg: 350, xl: 400 }}>
                <Paper sx={{ maxHeight: 334.5, maxWidth: 300 }}>
                    <Title m="sm" order={3}>
                        Who to follow
                    </Title>
                    <ScrollArea sx={{ height: "calc(100% - 55px)" }} offsetScrollbars>
                        <UserChip
                            name="aan sdas asds"
                            username="@sadsd asda"
                            photoURL="https://i.pravatar.cc/100"
                        />
                        <UserChip
                            name="aan sdas asds"
                            username="@sdfsswsssssssssssssssssss"
                            photoURL="https://i.pravatar.cc/100"
                        />
                        <UserChip
                            name="aan sdas asds"
                            username="@sadsd asda"
                            photoURL="https://i.pravatar.cc/120"
                        />
                        <UserChip
                            name="aan sdas asds"
                            username="@sadsd asda"
                            photoURL="https://i.pravatar.cc/100"
                        />
                        <UserChip
                            name="aan sdas asds"
                            username="@sadsd asda"
                            photoURL="https://i.pravatar.cc/100"
                        />
                        <UserChip
                            name="aan sdas asds"
                            username="@sadsd asda"
                            photoURL="https://i.pravatar.cc/120"
                        />
                    </ScrollArea>
                </Paper>
            </Aside>
        </MediaQuery>
    );
};
