import { useEffect } from "react";
/**
 * @name useFetchNextPage
 * @param inView true if the element with reference is in viewport
 * @param hasNextPage true if there are more data
 * @param fetchNextPage method for fetching the next page data
 */
function useFetchNextPage(inView: boolean, hasNextPage: boolean, fetchNextPage: any) {
    // fetches next page data, if the last element is in viewport and there are other data available.
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return null;
}

export default useFetchNextPage;
