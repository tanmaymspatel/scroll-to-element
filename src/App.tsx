import { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";

import AppShellLayout from "./core/components/AppShell";
import '../src/assets/icons/style.css';
import GlobalStyles from "./core/components/GlobalStyles";
/**
 * @returns POC in Mantine UI
 */
function App() {

  useEffect(() => {
    localStorage.setItem("isClicked", "no")
  }, []);

  return (
    <div className="App">
      <MantineProvider theme={{
        breakpoints: {
          xs: '30em',
          sm: '36em',
          md: '48em',
          lg: '62em',
          xl: '75em',
        }
      }}>
        <GlobalStyles />
        <BrowserRouter>
          <AppShellLayout />
        </BrowserRouter>
      </MantineProvider>
    </div>
  )
}

export default App;


