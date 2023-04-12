import { Stack, Switch, createStyles } from '@mantine/core'

const useStyle = createStyles(() => ({
    header: {
        flex: "0 0 50px",
        maxHeight: "50px",
    }
}))

function MainView() {
    const { classes } = useStyle();
    return (
        <Stack h={"100%"}>
            <header className={classes.header}><Switch onLabel="Grid" offLabel="List" size='lg' /></header>
            <main className='flex-grow-1'>List randering</main>
        </Stack>
    )
}

export default MainView
