import react from "react";
import { useNavigate } from 'react-router-dom';

import { userDetails } from "../shared/model/userDetails";
import { createStyles } from "@mantine/core";

interface ITableRowProps {
    user: userDetails
}

const useStyle = createStyles(() => ({
    cursor_pointer: {
        cursor: "pointer"
    }
}))
/**
 * @returns individual table row
 */
const TableRow = react.forwardRef(({ user }: ITableRowProps, ref: any) => {

    const { classes } = useStyle();
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
    const body =
        <>
            <td>{user.id}</td>
            <td className={classes.cursor_pointer} onClick={() => navigateToUserDetails(user.id)}>{user.title}</td>
            <td>{user.userId}</td>
            <td>{user.completed ? "YES" : "NO"}</td>
        </>

    // ref is added to the last element
    const content = ref
        ? <tr ref={ref} className={`user-${user.id}`} data-item="true" id={`row-${user.id}`}>{body}</tr>
        : <tr className={`user-${user.id}`} data-item="true" id={`row-${user.id}`}>{body}</tr>

    return content;
});

export default TableRow;
