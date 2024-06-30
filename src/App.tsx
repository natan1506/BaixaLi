import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import './global.css'
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="bg-zinc-900 container h-screen flex flex-col text-gray-100 items-center justify-center">
      <Input className=""/>
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

