import { ToggleTheme } from "../toogle-theme";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Header () {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost">Único</Button>
        </div>
        <ToggleTheme />
      </div>

      <Separator className="my-4" />
    </div>

  )
}