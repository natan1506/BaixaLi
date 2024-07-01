import { Header } from "@/components/Header";
import { ToggleTheme } from "@/components/toogle-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Download () {
  return (
    <div className="flex flex-col h-full w-full py-4">
      <Header/>
      <form className="flex flex-col items-center justify-center gap-3">
        <div className="w-full">
          <Label htmlFor="first-chapter">URL do Primeiro Capítulo</Label>
          <Input id="first-chapter" className=""/>
        </div>
        <div className="w-full">
          <Label htmlFor="first-chapter">URL do Último Capítulo</Label>
          <Input id="first-chapter" className=""/>
        </div>
        <div className="w-full">
          <Label htmlFor="first-chapter">Formato</Label>
          <Input id="first-chapter" className=""/>
        </div>
        <div className="flex w-full gap-2">
          <Button 
             className="flex-1" type="submit">
            Entrar
          </Button>
          <Button variant="destructive"  className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}