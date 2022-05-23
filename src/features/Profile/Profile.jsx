import { Stack } from "@mantine/core";
import { PostCard } from "../components";
import { UserProfileInfo } from "./components";

export const Profile = () => {
	return (
		<UserProfileInfo>
			<Stack>
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
					<PostCard
						key={i}
						avatarUrl="https://i.pravatar.cc/150"
						userName="dsfsdsd-sdfd"
						fullName="aman sadsa asdas"
						imgUrl="https://picsum.photos/500/200"
						postText="kjfds sflsdkjfsdklf sdjflskdfjsd sd fjdsklfjds sdfjdsfldjsf sdf jdslkjfsd sdlfkjskf sdflksjfsldf sdlfjsdfjds sdfjsdfksjdf sdkfjskldjsfd sdfjslkjds sdflkkjsdflkjds sdkjsdfkljsdf sdflkjsfsdjfj sdfjsdfdsdf jdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
					/>
				))}
			</Stack>
		</UserProfileInfo>
	);
};
