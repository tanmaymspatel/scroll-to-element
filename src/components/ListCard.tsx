import { Grid } from '@mantine/core';
import { useInView } from "react-intersection-observer";

import { userDetails } from '../shared/model/userDetails';
import SingleCard from './SingleCard';
import { useEffect } from 'react';

function ListCard({ dataProps }: any) {

    const { hasNextPage, fetchNextPage, userData } = dataProps;
    const { ref, inView } = useInView();

    const cards = userData?.pages?.map((page: userDetails[]) => {
        return page.map((user: userDetails, index: number) => {
            if (page.length === index + 1) {
                return <SingleCard ref={ref} user={user} key={user.id} />
            }
            return <SingleCard user={user} key={user.id} />
        })
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return (
        <Grid>
            {cards}
        </Grid>
    )
}

export default ListCard
