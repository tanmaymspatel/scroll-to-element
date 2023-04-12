import { MantineProvider } from "@mantine/core"
import AppShellLayout from "./core/components/AppShell"

import '../src/assets/icons/style.css'

function App() {

  return (
    <div className="App">
      <MantineProvider>
        <AppShellLayout />
      </MantineProvider>
    </div>
  )
}

export default App
