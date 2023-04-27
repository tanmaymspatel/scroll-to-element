import { Grid } from '@mantine/core';
import { useInView } from "react-intersection-observer";

import { userDetails } from '../shared/model/userDetails';
import SingleCard from './SingleCard';
import useFetchNextPage from '../hooks/useFetchNextPage';

/**
 * @returns all the user data in form of cards
 */
function ListCard({ dataProps }: any) {

    const { hasNextPage, fetchNextPage, userData } = dataProps;
    // ref -  for taking the reference of last element in the viewport
    // inview - true if the element of which are taking reference is in the viewport  
    const { ref, inView } = useInView();

    const cards = userData?.pages?.map((page: userDetails[]) => {
        return page.map((user: userDetails, index: number) => {
            if (page.length === index + 1) {
                // adding the ref to the last element in the list
                return <SingleCard ref={ref} user={user} key={user.id} />
            }
            return <SingleCard user={user} key={user.id} />
        })
    })
    // for fetching next page
    useFetchNextPage(inView, hasNextPage, fetchNextPage);

    return (
        <Grid>
            {cards}
        </Grid>
    )
}

export default ListCard
