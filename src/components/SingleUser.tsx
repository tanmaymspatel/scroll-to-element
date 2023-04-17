import { Badge, Button, Card, Group, Image, MediaQuery, Text, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import react from 'react';

const useStyle = createStyles(() => ({
    text_ellipsis: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "300px"
    },

}))

const SingleUser = react.forwardRef(({ user, isGridView, index }: any, ref: any) => {

    const { classes } = useStyle();
    console.log({ isGridView });


    const navigate = useNavigate();
    const body = (
        <>
            {!isGridView &&
                <>
                    <td>{user.id}</td>
                    <td>{user.title}</td>
                    <td>{user.userId}</td>
                    <td>{user.completed ? "YES" : "NO"}</td>
                </>
            }

            {isGridView &&
                <MediaQuery smallerThan={"sm"} styles={{ display: "block" }}>
                    <td colSpan={5} style={isGridView ? { flexGrow: 1, flexShrink: 1 } : {}}>
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

                            <Text size="sm" color="dimmed" className={classes.text_ellipsis}>
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
        ? <tr ref={ref} data-item="true" onClick={() => navigate(`dashboard/${user.id}`)} style={isGridView ? { display: "flex" } : {}}>{body}</tr>
        : <tr data-item="true" onClick={() => navigate(`dashboard/${user.id}`)} style={isGridView ? { display: "flex" } : {}}>{body}</tr>

    return content
})

export default SingleUser
