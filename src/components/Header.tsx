import { Switch } from '@mantine/core'
import { useCallback } from 'react';

interface IHeaderProps {
    setCurrentView: React.Dispatch<React.SetStateAction<string>>,
    isGridView: boolean,
}
/**
 * @returns header of the listing page
 */
function Header({ setCurrentView, isGridView }: IHeaderProps) {

    /**
     * @name changeListView
     * @description to change the view
     */
    const changeListView = useCallback(() => {
        setCurrentView((prev: string) => prev === 'list' ? "grid" : "list");
    }, [setCurrentView])

    return (
        <Switch
            onLabel="Grid"
            offLabel="List"
            size='lg'
            onChange={changeListView}
            checked={isGridView}
        />
    )
}

export default Header;
