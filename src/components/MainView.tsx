import { MediaQuery, Stack, createStyles } from '@mantine/core'
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
        overflowY: "auto",
        overflowX: "hidden",
    }
}))
/**
 * @returns component with header and listing view 
 */
function MainView() {
    const isClicked = localStorage.getItem("isClicked") as string;
    const viewInLocal = localStorage.getItem("currentView") as string
    const initialView = (isClicked === "yes" && viewInLocal === "grid") ? "grid" : "list";
    const [currentView, setCurrentView] = useState(initialView);
    const { classes } = useStyle();
    const isGridView = currentView === "grid";

    useEffect(() => {
        if (window.innerWidth < 576) setCurrentView("grid");
    }, [window.innerWidth])

    useEffect(() => {
        localStorage.setItem("currentView", currentView)
    }, [currentView])

    return (
        <Stack h={"100%"} spacing={0}>
            <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                <header className={classes.header}>
                    <Header setCurrentView={setCurrentView} isGridView={isGridView} />
                </header>
            </MediaQuery>
            <main className={classes.main}>
                <ScrollList currentView={currentView} isGridView={isGridView} />
            </main>
        </Stack>
    )
}

export default MainView;
