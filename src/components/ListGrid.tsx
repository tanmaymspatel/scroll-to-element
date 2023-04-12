import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';

function ListGrid({ userData }: any) {

    const cards = userData?.map((user: any, index: number) => (
        <Grid.Col md={6} lg={4} key={user.id}>
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
        </Grid.Col>
    ))

    return (
        <Grid>
            {cards}
        </Grid>
    )
}

export default ListGrid
