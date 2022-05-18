import { useState } from "react";
import { ActionIcon, Avatar, Card, Group, Image, Menu, Spoiler, Stack, Text } from "@mantine/core";
import { useIcons } from "../../../hooks";

export const PostCard = ({ fullName, avatarUrl, userName, imgUrl, postText }) => {
    const getIcons = useIcons();
    return (
        <Card
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            })}>
            <Group
                position="apart"
                sx={(theme) => ({
                    gap: theme.spacing.lg,
                })}>
                <Group>
                    <Avatar size="lg" alt="profile of user" color="blue" src={avatarUrl}>
                        {getIcons("profile", 28)}
                    </Avatar>
                    <Stack sx={{ gap: 0 }}>
                        <Text transform="uppercase" sx={{ wordWrap: "anywhere" }} lineClamp={1}>
                            {fullName}
                        </Text>
                        <Text sx={{ wordWrap: "anywhere" }} size="sm" lineClamp={1} color="gray">
                            {userName}
                        </Text>
                        <Text sx={{ wordWrap: "anywhere" }} size="xs" lineClamp={1} color="gray">
                            {"3d"}
                        </Text>
                    </Stack>
                </Group>
                <Menu
                    control={
                        <ActionIcon size="lg" variant="transparent">
                            {getIcons("menu", 20)}
                        </ActionIcon>
                    }
                    closeOnScroll
                    zIndex="99"
                    withArrow
                    withinPortal
                    position="left"
                    gutter={10}
                    transition="rotate-left">
                    <Menu.Item icon={getIcons("edit", 20)}>Edit</Menu.Item>
                    <Menu.Item icon={getIcons("delete", 20)}>Delete</Menu.Item>
                    <Menu.Item icon={getIcons("link", 20)}>Link</Menu.Item>
                </Menu>
            </Group>
            {/* <Text lineClamp={seeMore} sx={{ wordWrap: "anywhere" }}>
                {postText}
            </Text> */}
            <Spoiler sx={{ wordWrap: "anywhere" }} maxHeight={50} showLabel="...see more">
                {postText}
            </Spoiler>
            {!!imgUrl && (
                <Card.Section my="sm">
                    <Image
                        withPlaceholder
                        imageProps={{
                            style: { maxHeight: 400, objectFit: "contain" },
                        }}
                        alt="asdasdsd"
                        src={imgUrl}
                    />
                </Card.Section>
            )}
            <Group
                position="apart"
                sx={(theme) => ({
                    gap: theme.spacing.lg,
                })}>
                <Group sx={{ flexWrap: "nowrap" }}>
                    <ActionIcon variant="transparent">{getIcons("like", 28)}</ActionIcon>
                    <ActionIcon variant="transparent">{getIcons("comment", 28)}</ActionIcon>
                </Group>
                <ActionIcon variant="transparent">{getIcons("saved", 28)}</ActionIcon>
            </Group>
            <Text>231 Likes</Text>
            <Text weight="bold" mt="xs" variant="link" sx={{ cursor: "pointer" }}>
                View all 190 comments
            </Text>
        </Card>
    );
};
