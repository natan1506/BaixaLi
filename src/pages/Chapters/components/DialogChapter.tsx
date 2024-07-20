import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { downloadChapter, getChapter } from "@/api/axios"

interface DialogProps {
  openState: boolean
  handleChangeOpened: (arg0:boolean) => void
  chapterSelected: string
}

export function DialogChapters({openState, handleChangeOpened, chapterSelected}:DialogProps) {
  const [opened, setOpened] = useState(openState)
  const [data, setData] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [messageDownload, setMessageDownload] = useState("")
  // const [progressDownloading, setProgressDownloading] = useState({ current: 0, total: 0 })
  const [controlImg, setControlImg] = useState({
    current:0,
    total:0
  })

  async function get () {
    const chapter = await getChapter(chapterSelected)
    if(chapter && chapter.length > 0) {
      setData(chapter)
    }
    setControlImg((prev) => ({
      ...prev,
      total: chapter ? chapter.length : 0
    }))
    setIsLoading(false)
  }

  useEffect(() => {
    setOpened(openState)
    if(chapterSelected !== "") {
      get()
    }
  }, [openState])

  const changeStateDialog = () => {
    handleChangeOpened(!opened)
    setIsLoading(true)
    setIsDownloading(false)
    setMessageDownload("")

  }

  const handleChangeImg = (direction: string) => {
    setControlImg((prev) => ({
      current: direction === "prev" ? prev.current -1 :prev.current +1 ,
      total: prev.total
    }))
    
  }
 
  const handleInitialDownload = async() => {
    setIsDownloading(true)
    const download = await downloadChapter(chapterSelected)

    if(download){
      setIsDownloading(false)
      setMessageDownload("concluido")
    }
  }



  return (
    <Dialog 
      open={opened}
      onOpenChange={changeStateDialog}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg  sm:max-h-[80%] overflow-hidden overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualize e baixe seu manga</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <LoaderCircle className="animate-spin h-7 w-7"/>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 ">
            <div className="flex w-full justify-between">
              <div className="flex gap-2 items-center">
                <Button 
                  type="button" 
                  size="xs" 
                  disabled={isLoading || isDownloading}
                  onClick={handleInitialDownload}
                >
                  Baixar
                </Button>
                <span className="text-sm">{controlImg.current +1}/{controlImg.total}</span>
              </div>
              <div className="flex gap-1 ">
                <Button 
                  type="button"
                  size="xs"
                  onClick={() => handleChangeImg("prev")}
                  disabled={controlImg.current === 0 ? true : false}
                >
                  <ChevronLeft />
                </Button>
                <Button 
                  type="button"
                  size="xs"
                  onClick={() => handleChangeImg("next")}
                  disabled={controlImg.current +1 === controlImg.total ? true : false}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            {isDownloading && (
              <div>
                {/* <span>Preparando: <b>{progressDownloading.current}</b> de <b>{progressDownloading.current}</b></span> */}
                <span>Baixando</span>
              </div>
            )} 
            {messageDownload && (
              <div>
                {/* <span>Preparando: <b>{progressDownloading.current}</b> de <b>{progressDownloading.current}</b></span> */}
                <span>{messageDownload}</span>
              </div>
            )}
            <img src={data[controlImg.current]} alt="" className="w-full " />
          </div>

        )}
        <DialogFooter className="sm:justify-end" >
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
