import { fetchChapters } from "@/api/Http"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { DialogChapters } from "./components/DialogChapter";
import { Loading } from "@/components/Loading";
 
interface dataProps {
  chapters?: [],
  mangaId?: string
}


export function Chapters() {
  const location = useLocation();
  const {id, type} = useParams()
  const [data, setData] = useState<dataProps | undefined>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)
  const [noResults, setNoResults] = useState<boolean>(false);
  const [chapterSelected, setChapterSelected] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      if(id) {
        if(type === "manga") {
          const chapters = await fetchChapters(id)
          setData(chapters)

          if(data?.chapters && data.chapters.length > 0 ) {
            setNoResults(true)
          }
          setLoading(false)
        }
      }
    }
    fetch()
  }, [])

  const handleDownloadChapter = (id:string) => {
    setOpenDialog(true)
    setChapterSelected(id)
    // downloadChapter(id)
  }

  const handleChangeOpened = (e:boolean) => {
    setOpenDialog(e)
    setChapterSelected("")
  }

  return (
    <div className="flex flex-col">
      <DialogChapters
        openState={openDialog}
        handleChangeOpened={handleChangeOpened}
        chapterSelected={chapterSelected}
      />
      <div className="flex flex-col gap-2">
        <div className="border-b relative h-[300px] overflow-hidden">
          <img className="z-[-1] h-[300px] w-full object-cover absolute" src={location.state.img} />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
          <h3 className="container absolute my-2 bottom-0 text-3xl">{location.state.name}</h3>
          <div className="container absolute w-full my-2">
            <Link to="/">
              <Button variant="destructive">Back</Button>
            </Link>
          </div>
        </div>
        <div className="container justify-between gap-2">
        <Loading state={loading}/>
        {data?.chapters && data.chapters.length > 0 ? (
          data.chapters.map((result:any, index:number) => (
            <button 
              key={index} 
              className="hover:bg-muted-foreground w-full border-b hover:text-muted transition-colors py-2 px-4 rounded-md flex justify-between gap-2 items-center"
              onClick={() => handleDownloadChapter(result?.id)}
            >
              <h3 className="text-2xl font-bold">
                chapter: {result?.attributes.chapter}
              </h3>
              <span>language: {result?.attributes.translatedLanguage}</span>
              {/* <Flag code={getCountryCode(result.attributes.translatedLanguage)} style={{ width: '20px', height: '20px' }} /> */}
              {/* <div className="flex justify-end w-full">
              </div> */}
            </button>
          ))
        ) : (
         ""
        )}

          {noResults && (
            <p>No results</p>
          )}
        </div>
      </div>
    </div>
  )
}