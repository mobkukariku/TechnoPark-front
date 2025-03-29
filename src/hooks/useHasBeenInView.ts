import { useEffect, useState,} from "react";
import { useInView } from "react-intersection-observer";

export const useHasBeenInView = (threshold = 0.2) => {
    const { ref, inView } = useInView({ threshold, triggerOnce: true });
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        if (inView) {
            setHasBeenInView(true);
        }
    }, [inView]);

    return { ref, hasBeenInView };
};
