import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Group, Badge, Button, Image, Text, createStyles } from "@mantine/core"
import { userDetails } from "../shared/model/userDetails";

const useStyle = createStyles(() => ({
    text_ellipsis: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "300px"
    },
    cursor_pointer: {
        cursor: "pointer"
    }
}
));

interface IsingleCardProps {
    user: userDetails
}

const SingleCard = React.forwardRef(({ user }: IsingleCardProps, ref: any) => {

    const { classes, cx } = useStyle();
    const navigate = useNavigate();
    /**
    * @name navigateToUserDetails
    * @param id id of the clicked user 
    * @description navigates to respective details of the user page; stores values of id and isclicked to the localstorage 
    */
    const navigateToUserDetails = (id: number) => {
        navigate(`dashboard/${id}`);
        localStorage.setItem("clickedId", JSON.stringify(id));
        localStorage.setItem("isClicked", "yes");
    }

    const body = (
        <Card shadow="sm" padding="lg" radius="md" withBorder id={`card-${user.id}`}>
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

            <Text
                size="sm"
                color="dimmed"
                className={cx(classes.text_ellipsis, classes.cursor_pointer)}
                onClick={() => navigateToUserDetails(user.id)}
            >
                {user.title}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                IsCompleted: {user.completed ? "YES" : "NO"}
            </Button>
        </Card>
    )

    const content = ref
        ? <Grid.Col ref={ref} className={`user-${user.id}`} data-item="true" md={6} lg={4} key={user.id}>{body}</Grid.Col>
        : <Grid.Col className={`user-${user.id}`} data-item="true" md={6} lg={4} key={user.id}>{body}</Grid.Col>

    return content;
})

export default SingleCard;
