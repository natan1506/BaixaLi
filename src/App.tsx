
import './global.css'
import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

function App() {
  return (
    <div className="h-screen w-screen justify-center items-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}


export default App;

//example form with invoke
{/* <form
className="row"
onSubmit={(e) => {
  e.preventDefault();
  greet();
}}
>
<input
  id="greet-input"
  onChange={(e) => setName(e.currentTarget.value)}
  placeholder="Enter a name..."
/>
<Button>Ola</Button>
<button type="submit">Greet</button>
</form> */}

