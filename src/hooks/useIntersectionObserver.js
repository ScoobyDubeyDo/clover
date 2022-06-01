import { useEffect, useState } from "react";

export const useIntersectionObserver = (elementRef, loadMore) => {
	const [isOnScreen, setIsOnScreen] = useState(false);

	useEffect(() => {
		if (loadMore) {
			const node = elementRef?.current; // DOM Ref
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setIsOnScreen(entry.isIntersecting);
					}
				},
				{ threshold: 1 }
			);

			if (!!node) {
				observer.observe(node);
			}

			return () => {
				if (node) {
					setIsOnScreen(false);
					observer.disconnect();
				}
			};
		}
	}, [loadMore, elementRef]);

	return isOnScreen;
};

export default useIntersectionObserver;
