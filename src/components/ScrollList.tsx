import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from 'react-query'

import { MediaQuery, Table, createStyles } from "@mantine/core";
import SingleUser from "./SingleUser";
import scrollServices from "../shared/services/scrollServices";

const useStyle = createStyles((theme) => ({
    head: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.white,
    },
    list: {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridGap: "5px",
    },
    list_grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "5px",

        [theme.fn.smallerThan('xl')]: {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        [theme.fn.smallerThan('md')]: {
            gridTemplateColumns: "repeat(1, 1fr)",
        }
    },
    header_visibility: {
        visibility: "hidden",
        display: "none"
    }
}))

interface IScrollListProps {
    currentView: string,
    isGridView: boolean
}

/**
 * @returns 
 */
function ScrollList({ currentView, isGridView }: IScrollListProps) {

    const { classes, cx } = useStyle();
    const { getUsers } = scrollServices;

    const {
        fetchNextPage, //function 
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
    } = useInfiniteQuery('/users', ({ pageParam = 1 }) => getUsers(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef<any>()
    const lastPostRef = useCallback((user: any) => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(users => {
            if (users[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })

        if (user) intObserver.current.observe(user)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    // Helper function that allows finding first element in the view port
    const findFirstElementInViewPort = (elements: any) =>
        Array.prototype.find.call(
            elements,
            element => element.getBoundingClientRect().y >= 150 // header offset
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
            // Scroll by height of header
            window.scrollBy(0, -150);
        }
    }, [scrollTo, currentView]);

    const content = data?.pages?.map((pg) => {
        return pg.map((user: any, index: number) => {
            if (pg.length === index + 1) {
                return <SingleUser ref={lastPostRef} key={user.id} user={user} isGridView={isGridView} />
            }
            return <SingleUser key={user.id} user={user} isGridView={isGridView} />
        })
    })
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

    return (
        <>
            <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
                <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                    <thead
                        className={cx(classes.head,
                            { [classes.header_visibility]: isGridView }
                        )}>
                        <tr>
                            <th>id</th>
                            <th>Title</th>
                            <th>User id</th>
                            <th>IsCompleted</th>
                        </tr>
                    </thead>
                </MediaQuery>
                <tbody ref={containerRef} className={isGridView ? classes.list_grid : ""} >
                    {content}
                </tbody>
            </Table>
        </>
    )
}

export default ScrollList;
