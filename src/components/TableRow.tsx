import react from "react";
import { userDetails } from "../shared/model/userDetails";

interface ITableRowProps {
    user: userDetails
}

const TableRow = react.forwardRef(({ user }: ITableRowProps, ref: any) => {

    const body =
        <>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </>


    const content = ref
        ? <tr ref={ref} data-item="true" id={`row-${user.id}`}>{body}</tr>
        : <tr data-item="true" id={`row-${user.id}`}>{body}</tr>

    return content;
});

export default TableRow;
