import { useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { SingleComment } from "./components";

export const AllCommentsBox = ({
	comments,
	commentsLength,
	setCommentsLength,
}) => {
	const [commentsDetails, setCommentsDetails] = useState([]);

	useEffect(() => {
		if (comments.length > 0) {
			(async () => {
				const temp = [];
				let i = 0;
				while (true) {
					const q = query(
						collection(db, "comments"),
						where("uid", "in", [...comments].slice(i, i + 10))
					);
					const querySnapshot = await getDocs(q);
					querySnapshot.forEach((comment) =>
						temp.push(comment.data())
					);
					if (querySnapshot.size === 10) i += 10;
					else break;
				}
				setCommentsDetails(temp);
			})();
		}
		if (comments.length === 0) setCommentsDetails([]);
	}, [comments]);
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: commentsLength > 2 ? "column-reverse" : "column",
				justifyContent: "center",
			}}>
			{comments.length > 2 && (
				<Text
					onClick={() =>
						setCommentsLength(
							commentsLength > 2 ? 2 : comments.length
						)
					}
					weight="bold"
					mt="xs"
					variant="link"
					sx={{ cursor: "pointer" }}>
					{commentsLength > 2
						? "Hide comments"
						: `View all ${comments.length} comments`}
				</Text>
			)}
			<div>
				{[...commentsDetails]
					.sort(
						(a, b) =>
							b.uploadDate?.toDate() - a.uploadDate?.toDate()
					)
					.slice(0, commentsLength)
					.map(({ uid, userId, commentText, uploadDate, postId }) => {
						return (
							<SingleComment
								key={uid}
								uploadDate={uploadDate}
								userId={userId}
								commentText={commentText}
								postId={postId}
								commentId={uid}
							/>
						);
					})}
			</div>
		</Box>
	);
};
