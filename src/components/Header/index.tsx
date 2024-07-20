import { ToggleTheme } from "../toogle-theme";
import { Separator } from "../ui/separator";

export function Header () {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          {/* <Button variant="ghost">Único</Button> */}
          <h1>Faça sua pesquisa!</h1>
        </div>
        <ToggleTheme />
      </div>
      <Separator className="my-4" />
    </div>

  )
}