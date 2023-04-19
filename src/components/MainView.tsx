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
        overflow: "auto"
    }
}))
/**
 * @returns component with header and listing view 
 */
function MainView() {

    const [currentView, setCurrentView] = useState("list");
    const { classes } = useStyle();
    const isGridView = currentView === "grid";

    useEffect(() => {
        if (window.innerWidth < 576) setCurrentView("grid");
    })

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

export default MainView
