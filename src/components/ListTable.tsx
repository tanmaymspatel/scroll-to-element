import { useEffect } from 'react';
import { Table } from '@mantine/core';
import { createStyles } from '@mantine/styles'
import { useInView } from "react-intersection-observer";

import TableRow from './TableRow';
import { userDetails } from '../shared/model/userDetails';

const useStyle = createStyles((theme) => ({
    thead: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.orange[0],
        position: "sticky",
        top: 0
    }
}))

function ListTable({ dataProps }: any) {

    const { hasNextPage, fetchNextPage, data: userData } = dataProps;
    const { classes } = useStyle();
    const { ref, inView } = useInView();

    const rows = userData?.pages?.map((page: userDetails[]) => {
        return page.map((user: userDetails, index: number) => {
            if (page.length === index + 1) {
                return <TableRow ref={ref} user={user} key={user.id} />
            }
            return <TableRow user={user} key={user.id} />
        })
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);
    return (
        <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
            <thead className={classes.thead}>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>User id</th>
                    <th>IsCompleted</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default ListTable;
