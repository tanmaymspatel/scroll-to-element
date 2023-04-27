import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from 'react-query';

import scrollServices from "../shared/services/scrollServices";
import ListTable from "./ListTable";
import ListCard from "./ListCard";
import utilityServices from '../shared/services/utilityServices'

interface IScrollListProps {
    currentView: string,
    isGridView: boolean,
}
/**
 * @returns user list in form of cards and table
 */
function ScrollList({ currentView, isGridView }: IScrollListProps) {

    const clickedId = (parseInt(localStorage.getItem("clickedId") as string));
    const isClicked = localStorage.getItem("isClicked") as string
    const { getUsers } = scrollServices;
    const { scrollToElementAfterBackClick, findFirstElementInViewPort } = utilityServices;
    const [idToBePreserved, setIdToBePreserved] = useState<number>(0);
    const [userData, setUserData] = useState<any>([])
    const view = localStorage.getItem("currentView");
    // fetching the user data for infinite scroll
    const {
        fetchNextPage,
        hasNextPage,
        data,
    } = useInfiniteQuery('/users', ({ pageParam = 1 }) => getUsers(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data]);

    // Ref to the container with the user list
    const containerRef = useRef<any>(null);
    /**
     * @name scrollTo
     * @description first element in the viewport with the reference to the container
     */
    const scrollTo = useMemo(() => {
        // Find all elements in container which will be checked if are in view or not
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");

        if (nodeElements) {
            return findFirstElementInViewPort(nodeElements);
        }

        return undefined;
    }, [currentView]);
    // storing the id of the first element in view port
    useLayoutEffect(() => {
        if (scrollTo) {
            if (view === "list") { setIdToBePreserved(scrollTo.className.slice(5)); }
            if (view === "grid") { setIdToBePreserved(scrollTo.className.split(" ")[1].slice(5)); }
        }
        // console.log(idToBePreserved);

    }, [currentView]);

    /**
     * @name scrollToElement
     * @param idToBePreserved id 
     * @param view current view
     * @description scroll to the perticular element in the viewport
     */
    const scrollToElementAfterTogglingView = () => {
        if (idToBePreserved) {
            document.querySelector(`.user-${idToBePreserved}`)?.scrollIntoView();
            window.scrollBy(0, -190);
        }
    }
    // Restoring the scroll after toggling the view
    useEffect(() => {
        scrollToElementAfterTogglingView();
    }, [scrollToElementAfterTogglingView])
    // Restoring the scroll after hitting the back button
    useEffect(() => {
        setTimeout(() => {
            if (isClicked === "yes" && clickedId) {
                scrollToElementAfterBackClick()
            }
        }, 0)
    }, [scrollToElementAfterBackClick, clickedId]);

    const dataProps = {
        fetchNextPage,
        hasNextPage,
        userData
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
