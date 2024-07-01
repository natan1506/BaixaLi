
import { invoke } from "@tauri-apps/api/tauri";
import './global.css'
import { useEffect, useState } from "react";
import { InitialApp } from "./pages/InitialApp";
import { Download } from "./pages/Download";
import { ThemeProvider } from "@/components/theme-provider"


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [View, setView] = useState(<InitialApp/>)

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  useEffect(() => {
    setTimeout(() => {
      setView(<Download/>)
    }, 500)
  }, [])

  return (
    <div className="container h-screen w-screen justify-center items-center my-auto">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {View}
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

