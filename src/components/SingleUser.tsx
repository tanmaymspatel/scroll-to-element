import { Badge, Button, Card, Group, Image, MediaQuery, Text, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import react from 'react';
import { userDetails } from '../shared/model/userDetails';

const useStyle = createStyles(() => ({
    text_ellipsis: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "300px"
    },
}))

interface ISingleUSerProps {
    user: userDetails,
    isGridView: boolean
}
/**
 * @returns single user row
 */
const SingleUser = react.forwardRef(({ user, isGridView, }: ISingleUSerProps, ref: any) => {

    const { classes } = useStyle();
    const navigate = useNavigate();
    /**
     * @name navigateToDetails
     * @param id id of the clicked user 
     * @description navigates to respective details of the user page; stores values of id and isclicked to the localstorage 
     */
    const navigateToDetails = (id: number) => {
        navigate(`dashboard/${id}`);
        localStorage.setItem("id", JSON.stringify(id));
        localStorage.setItem("isClicked", "yes");
    }

    const body = (
        <>
            {!isGridView &&
                <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                    <>
                        <td >{user.id}</td>
                        <td id={`list-td-${user.id}`} style={{ cursor: "pointer" }} >{user.title}</td>
                        <td>{user.userId}</td>
                        <td>{user.completed ? "YES" : "NO"}</td>
                    </>
                </MediaQuery>
            }

            {isGridView &&
                <MediaQuery smallerThan={"sm"} styles={{ display: "block" }}>
                    <td colSpan={5} style={isGridView ? { flexGrow: 1, flexShrink: 1, borderTop: 0 } : {}}>
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

                            <Text size="sm" color="dimmed" className={classes.text_ellipsis}

                                style={{ cursor: "pointer" }}
                            >
                                {user.title}
                            </Text>

                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                IsCompleted: {user.completed ? "YES" : "NO"}
                            </Button>
                        </Card>
                    </td>
                </MediaQuery>
            }
        </>
    )

    const content = ref
        ? <tr ref={ref} data-item="true" style={isGridView ? { display: "flex" } : {}} onClick={() => navigateToDetails(user?.id)}>{body}</tr>
        : <tr data-item="true" style={isGridView ? { display: "flex" } : {}} onClick={() => navigateToDetails(user?.id)}>{body}</tr>

    return content;
})

export default SingleUser;
