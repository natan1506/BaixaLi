// @ts-ignore: TS6133
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchManga } from "@/api/Http";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { Loading } from "@/components/Loading";

export function Initial () {
  const nav = useNavigate()
  const [dataManga, setDataManga] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<any>("");
  // const [dataHq, setDataHq] = useState([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  // const [typeView, setTypeView] = useState<"paged" | "list">("paged");
  const handleSearchMangas = async () => {
    setLoading(true)
    const consult = await searchManga(name)
    // const constultHq = await searchHq(name)
    if(consult.data) {
      setDataManga(consult.data);
    }

    // console.log(constultHq)
    // setDataHq(constultHq);
    // if(consult && consult.length === 0 &&  constultHq.length === 0) {
    //   setNoResults(true)
    // }
    if(consult.data && consult.data.length === 0) {
      setNoResults(true)
    }
    if(consult.error) {
      setMessageError(JSON.stringify(consult.message, null, 2))
    }
    setLoading(false)
  }

  const handleFetchChapters = (id:string, type:string, img:string, name:string)  => {
    nav(`/chapters/${id}/${type}`, {state:{img, name}})
  }


  return (
    <div className="container flex flex-col h-full w-full py-4">
      <Header/>
      <form className="flex flex-col items-center justify-center gap-3">
        <div className="w-full">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" className=""  onChange={(e) => setName(e.target.value)}/>
        </div>
        {/* <div className="w-full">
          <Label htmlFor="first-chapter">URL do Primeiro Capítulo</Label>
          <Input id="first-chapter" className=""/>
        </div>
        <div className="w-full">
          <Label htmlFor="first-chapter">URL do Último Capítulo</Label>
          <Input id="first-chapter" className=""/>
        </div> */}
        <div className="w-full">
          <Label htmlFor="first-chapter">Formato</Label>
          <Input id="first-chapter" className="" disabled value="PDF"/>
        </div>
        <div className="flex w-full gap-2">
          <Button 
            type="button"
            onClick={handleSearchMangas}
            className="flex-1" >
            Pesquisar
          </Button>
         
          {/* <Button variant="destructive"  className="flex-1">
            Cancelar
          </Button> */}
        </div>
      </form>
      <div className="pt-2 flex flex-col gap-2">
        <div className="flex gap-2">
          {/* <Button
            onClick={() => handleChangeTypeView("list")}
          >
            List

          </Button>
          <Button
            onClick={() => handleChangeTypeView("paged")}
          >
            Paged
          </Button> */}
        </div>
        <Loading state={loading}/>
        <div className="grid grid-cols-4 gap-2">
          {dataManga && dataManga.length > 0 ? (
            dataManga.map((result:any, index:number) => (
              <div key={index} className="border p-2 rounded-md flex flex-col justify-between gap-2">
                  <img
                  className="rounded-md max-h-[80%] overflow-hidden"
                  src={result?.coverImage}
                  alt={result?.attributes.title.en || 'No title'}
                />
                <h3>{result?.attributes.title.en || 'No title'}</h3>
                <div className="flex justify-end w-full">
                  <Button 
                    variant="outline"
                    onClick={() => handleFetchChapters(result?.id, "manga", result?.coverImage, result?.attributes.title.en)}
                  >
                    Visualizar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            ""
          )}

          {/* {dataHq && dataHq.length > 0 ? (
            dataHq.map((result:any, index:number) => (
              <div key={index} className="border p-2 rounded-md flex flex-col justify-between gap-2">
                  <img
                  className="rounded-md max-h-[80%] overflow-hidden"
                  src={result.image.original_url}
                  alt={result.name || 'No title'}
                />
                <h3>{result.name || 'No title'}</h3>
                <div className="flex justify-end w-full">
                  <Button 
                    variant="outline"
                    onClick={() => handleFetchChapters(result.id, "hq", result.image.original_url, result.name)}
                  >
                    Visualizar
                  </Button>
                </div>
              </div>
            ))
          ) : (
            ""
          )} */}
          {noResults && (
            <p>No results</p>
          )}
          <span>{messageError}</span>
        </div>
      </div>
    </div>
  )
}