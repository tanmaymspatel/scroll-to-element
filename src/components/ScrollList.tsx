import { useLayoutEffect, useMemo, useRef } from "react";
import ListTable from "./ListTable";
import ListGrid from "./ListGrid";

function ScrollList({ userData, currentView, isGridView }: any) {

    // Helper function that allows finding first element in the view port
    const findFirstElementInViewPort = (elements: any) =>
        Array.prototype.find.call(
            elements,
            element => element.getBoundingClientRect().y >= 85 // nav height offset
        );

    // Ref to the container with elements
    const containerRef = useRef<any>(null);

    const scrollTo = useMemo(() => {
        // Find all elements in container which will be checked if are in view or not
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
        if (nodeElements) {
            return findFirstElementInViewPort(nodeElements);
        }

        return undefined;
    }, [currentView]);

    useLayoutEffect(() => {
        if (scrollTo) {
            // Scroll to element with should be in view after rendering
            scrollTo.scrollIntoView();
            // Scroll by height of nav
            window.scrollBy(0, -85);
        }
    }, [scrollTo, currentView]);

    return (
        <div ref={containerRef}>
            {
                !isGridView
                    ? <ListTable userData={userData} />
                    : <ListGrid userData={userData} />
            }
        </div>
    )
}

export default ScrollList;
