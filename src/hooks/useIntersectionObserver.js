import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (elementRef, { threshold = 0 }) => {
	const [isOnScreen, setIsOnScreen] = useState(false);

	const ref = useRef(
		new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsOnScreen(entry.isIntersecting);
				}
			},
			{ threshold }
		)
	);

	useEffect(() => {
		const node = elementRef?.current; // DOM Ref
		console.log({ node });

		const observer = ref.current;

		if (node) {
			observer.observe(node);
		}

		return () => {
			if (node) {
				setIsOnScreen(false);
				observer.disconnect();
			}
		};
	}, [elementRef, threshold]);

	return isOnScreen;
};

export default useIntersectionObserver;
