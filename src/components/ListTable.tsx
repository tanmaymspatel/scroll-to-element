import { Table } from '@mantine/core';
import { createStyles } from '@mantine/styles'
import { useInView } from "react-intersection-observer";

import TableRow from './TableRow';
import { userDetails } from '../shared/model/userDetails';
import useFetchNextPage from '../hooks/useFetchNextPage';

const useStyle = createStyles((theme) => ({
    thead: {
        backgroundColor: theme.colors.dark[0],
        color: theme.colors.orange[0],
        position: "sticky",
        top: 0
    }
}))
/**
 * @returns all the user data in form of table
 */
function ListTable({ dataProps }: any) {

    const { hasNextPage, fetchNextPage, userData } = dataProps;
    const { classes } = useStyle();
    // ref -  for taking the reference of last element in the viewport
    // inview - true if the element of which are taking reference is in the viewport  
    const { ref, inView } = useInView();

    const rows = userData?.pages?.map((page: userDetails[]) => {
        return page.map((user: userDetails, index: number) => {
            if (page.length === index + 1) {
                // adding the ref to the last element in the list
                return <TableRow ref={ref} user={user} key={user.id} />
            }
            return <TableRow user={user} key={user.id} />
        })
    })
    // for fetching next page
    useFetchNextPage(inView, hasNextPage, fetchNextPage);
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
