import { Table } from '@mantine/core';
import { createStyles } from '@mantine/styles'

const useStyle = createStyles((theme) => ({
    thead: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.orange[0],
        position: "sticky",
        top: 0
    }
}))
function ListTable({ userData }: any) {

    const { classes } = useStyle();

    const rows = userData?.map((user: any, index: number) => (
        <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.title}</td>
            <td>{user.id}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </tr>
    ));
    return (
        <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
            <thead className={classes.thead}>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>id</th>
                    <th>User id</th>
                    <th>IsCompleted</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default ListTable
