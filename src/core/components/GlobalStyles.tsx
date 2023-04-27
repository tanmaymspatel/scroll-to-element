import { Global } from '@mantine/core';
/**
 * @returns Global styles for the application
 */
function GlobalStyles() {
    return (
        <Global
            styles={() => ({
                '*, *::before, *::after': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0
                },
                'html,body,#root,.App': {
                    height: "100%"
                },
                'html,body': {
                    overflowX: "hidden"
                },
                '.h-100': {
                    height: "100%"
                },
                '.w-100': {
                    width: '100%'
                },
                '.d-flex': {
                    display: "flex"
                },
                '.flex-grow-1': {
                    flexGrow: 1
                },
                '.mantine-hr6aor': {
                    height: "100%"
                }
            })}
        />
    )
};

export default GlobalStyles;