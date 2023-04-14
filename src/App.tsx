import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from "@mantine/core"
import AppShellLayout from "./core/components/AppShell"

import '../src/assets/icons/style.css'

function App() {

  return (
    <div className="App">
      <MantineProvider>
        <BrowserRouter>
          <AppShellLayout />
        </BrowserRouter>
      </MantineProvider>
    </div>
  )
}

export default App
