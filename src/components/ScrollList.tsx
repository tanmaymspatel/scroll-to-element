import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from 'react-query';

import scrollServices from "../shared/services/scrollServices";
import ListTable from "./ListTable";
import ListCard from "./ListCard";

interface IScrollListProps {
    currentView: string,
    isGridView: boolean
}
/**
 * @returns 
 */
function ScrollList({ currentView, isGridView }: IScrollListProps) {

    const { getUsers } = scrollServices;
    const [idToBePreserved, setIdToBePreserved] = useState<number>(0);
    const view = localStorage.getItem("currentView")

    const {
        fetchNextPage, //function 
        hasNextPage, // boolean
        data,
    } = useInfiniteQuery('/users', ({ pageParam = 1 }) => getUsers(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    // Helper function that allows finding first element in the view port
    const findFirstElementInViewPort = (elements: any) =>
        Array.prototype.find.call(
            elements,
            element => element.getBoundingClientRect().y >= 192 // header offset
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
            if (currentView === "grid") setIdToBePreserved(scrollTo.childNodes[0].firstChild.nodeValue)

            // Scroll to element with should be in view after rendering
            // scrollTo.scrollIntoView();
            // Scroll by height of header
            if (currentView === "list") setIdToBePreserved(scrollTo.childNodes[0].childNodes[1]?.children[0]?.innerText.slice(3));

        }
    }, [currentView]);

    // useEffect(() => {
    //     console.log(scrollTo, idToBePreserved);
    // }, [scrollTo, currentView, idToBePreserved])

    // useEffect(() => {
    //     if (currentView === "list") localStorage.setItem("idToBePreserved", (JSON.stringify(idToBePreserved)));
    //     console.log({ currentView }, { idToBePreserved });
    // }, [currentView, idToBePreserved])

    /**
     * @name getElAfterBack
     * @description method to restore the scroll after hiiting the back button
    */
    const getElAfterBack = () => {
        let id = (parseInt(localStorage.getItem("id") as string));
        id--;
        const isClicked = localStorage.getItem("isClicked") as string
        if (isClicked === "yes") document.getElementById(`list-td-${id}`)?.scrollIntoView();
    }
    // calls before browser reprints the screen
    useLayoutEffect(() => {
        getElAfterBack()
    }, [getElAfterBack])

    // let ElementIdTobeScrolledAt: number;

    // useEffect(() => {
    //     ElementIdTobeScrolledAt = JSON.parse(localStorage.getItem("idToBePreserved") as string)
    // }, [currentView])


    const scrollToElement = () => {
        if (idToBePreserved) {
            if (view === "grid") {
                document.getElementById(`card-${idToBePreserved}`)?.scrollIntoView()
            }
            if (view === "list") {
                document.getElementById(`row-${idToBePreserved}`)?.scrollIntoView();
            }
            window.scrollBy(0, -192);
        }
    }

    useEffect(() => {
        scrollToElement()
    }, [scrollToElement])

    const dataProps = {
        fetchNextPage,
        hasNextPage,
        data
    }

    return (
        <div ref={containerRef}>
            {
                !isGridView
                    ? <ListTable dataProps={dataProps} />
                    : <ListCard dataProps={dataProps} />
            }
        </div>

    )
}

export default ScrollList;
