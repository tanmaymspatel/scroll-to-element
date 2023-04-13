import { useLayoutEffect, useMemo, useRef } from "react";
import ListTable from "./ListTable";
import ListGrid from "./ListGrid";
import { Badge, Button, Card, Group, Image, Paper, Table, Text, createStyles } from "@mantine/core";

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
        gridTemplateColumns: "repeat(4, 1fr)",
        gridGap: "5px",
    },
    header_visibility: {
        visibility: "hidden",
        display: "none"
    }
}))


function ScrollList({ userData, currentView, isGridView }: any) {

    const { classes, cx } = useStyle();

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
        <>
            <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
                <thead
                    className={cx(classes.head,
                        { [classes.header_visibility]: isGridView }
                    )}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>id</th>
                        <th>User id</th>
                        <th>IsCompleted</th>
                    </tr>
                </thead>

                <tbody ref={containerRef} className={isGridView ? classes.list_grid : ""} >
                    {
                        userData?.map((user: any, index: number) => (
                            <tr data-item="true" key={user.id}>
                                {!isGridView &&
                                    <>
                                        <td>{index + 1}</td>
                                        <td>{user.title}</td>
                                        <td>{user.id}</td>
                                        <td>{user.userId}</td>
                                        <td>{user.completed ? "YES" : "NO"}</td>
                                    </>
                                }

                                {isGridView &&
                                    <td colSpan={5}>

                                        <Card shadow="sm" padding="lg" radius="md" withBorder >
                                            <Image
                                                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                                height={160}
                                                alt="Norway"
                                            />

                                            <Group position="apart" mt="md" mb="xs">
                                                <Text weight={500}>id:{user.id}</Text>
                                                <Badge color="pink" variant="light">
                                                    User id: {user.userId}
                                                </Badge>
                                            </Group>

                                            <Text size="sm" color="dimmed">
                                                {user.title}
                                            </Text>

                                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                                IsCompleted: {user.completed ? "YES" : "NO"}
                                            </Button>
                                        </Card>
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {/* <div ref={containerRef}>
        </div> */}
        </>
    )
}

export default ScrollList;
