import { Stack, createStyles } from '@mantine/core'
import scrollServices from '../shared/services/scrollServices'
import { useEffect, useState } from 'react';
import ScrollList from './ScrollList';
import Header from './Header';

const useStyle = createStyles(() => ({
    header: {
        flex: "0 0 50px",
        maxHeight: "50px",
    },
    main: {
        flexGrow: 1,
        overflow: "auto"
    }
}))

function MainView() {

    const [currentView, setCurrentView] = useState("list");
    const { classes } = useStyle();
    const { getUsers, getNewUsers } = scrollServices;
    const [userData, setUserData] = useState<any>([]);

    const [page, setpage] = useState<number>(2);
    const [hasMore, sethasMore] = useState<boolean>(true);


    const isGridView = currentView === "grid";


    // new data according to specific page
    const fetchData = async () => {
        const res = await getNewUsers(page);
        const newData = res.data;
        console.log(newData);

        return newData;
    }
    // infinite scroll function
    const fetchNewData = () => {
        // const newUsers = await fetchData();
        // setUserData((prev: any) => [...prev, ...newUsers]);
        console.log("hello!");

    }

    useEffect(() => {
        getUsers().then(res => setUserData(res?.data))
    }, []);

    // useEffect(() => {
    //     console.log(userLength);

    // }, [userLength]);

    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <Header setCurrentView={setCurrentView} isGridView={isGridView} />
            </header>
            <main className={classes.main}>
                <ScrollList userData={userData} currentView={currentView} isGridView={isGridView} fetchNewData={fetchNewData} hasMore={hasMore} />
            </main>
        </Stack>
    )
}

export default MainView
