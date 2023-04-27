import { useParams } from "react-router";
/**
 * @returns details of the user 
 */
function UserDetails() {

    const { id } = useParams();

    return (
        <div>
            hi {id}
        </div>
    )
};

export default UserDetails;
