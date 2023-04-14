import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import react from 'react';

const SingleUser = react.forwardRef(({ user, isGridView, index }: any, ref: any) => {
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
        </>
    )

    const content = ref
        // ? <article ref={ref}>{body}</article>
        // : <article>{body}</article>

        ? <tr ref={ref} data-item="true" onClick={() => navigate(`dashboard/${user.id}`)}>{body}</tr>
        : <tr data-item="true" onClick={() => navigate(`dashboard/${user.id}`)}>{body}</tr>

    return content
})

export default SingleUser
