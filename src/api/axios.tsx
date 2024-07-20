import axios from 'axios'
import jsPDF from 'jspdf';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
const apiUrl = process.env.VITE_API_BASE_URL;

export async function searchManga(title:string, _lang?:string) {
  try {
    const url = `https://api.mangadex.org/manga?title=${title}`;
    const response = await axios.get(url);

    // const response = await axios.get(`${apiUrl}/search`, {
    //   params: { q: title }
    // });
    console.log(response)

    const mangaData = response.data.data;

    const mangaWithCovers = await getCovers(mangaData)

    return mangaWithCovers ? mangaWithCovers : [];
  } catch (error) {
    console.error('Error searching manga:', error);
  }
};

export async function fetchChapters(mangaId:string) {
  try {

    const url = `https://api.mangadex.org/manga/${mangaId}/feed`;
    const response = await axios.get(url);

    const chaptersData = response.data.data;

    const sortedChapters = chaptersData.sort((a:any, b:any) => {
      const chapterA = parseFloat(a.attributes.chapter);
      const chapterB = parseFloat(b.attributes.chapter);

      if (isNaN(chapterA)) return 1;
      if (isNaN(chapterB)) return -1;
      return chapterA - chapterB;
    });


    return {
      chapters: sortedChapters,
      selectedManga: mangaId
    }
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }
};

export async function downloadChapter(chapterId:string) {
  try {
    const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
    const { baseUrl } = response.data;
    const chapterHash = response.data.chapter.hash;
    const pageArray = response.data.chapter.data;

    // Create a link element and download each page
    // for (let page of pageArray) {
    //   const url = `${baseUrl}/data/${chapterHash}/${page}`;
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = page;
    //   link.click();
    // }
    const pdf = new jsPDF();
    for (let i = 0; i < pageArray.length; i++) {
      const page = pageArray[i];
      const url = `${baseUrl}/data/${chapterHash}/${page}`;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if(ctx){
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/jpeg');
            if (i > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            resolve();
          }
        };
      });
      console.log(pageArray.length)
    }
      console.log(pdf)
      // pdf.save(`chapter-${chapterId}.pdf`);
      const pdfData = pdf.output('arraybuffer');
      await writeBinaryFile(`chapter-${chapterId}.pdf`, new Uint8Array(pdfData), { dir: BaseDirectory.Download });
      return {messsage: "OK", status: 200}
  } catch (error) {
    console.error('Error downloading chapter:', error);
  }
};

export async function getChapter(chapterId:string) {
  try {
    const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
    const { baseUrl } = response.data;
    const chapterHash = response.data.chapter.hash;
    const pageArray = response.data.chapter.data;
    console.log(pageArray)

    const newData = []
    for (let i = 0; i < pageArray.length; i++) {
      const page = pageArray[i];
      const url = `${baseUrl}/data/${chapterHash}/${page}`;
      newData.push(url)
    }

    return newData
  } catch (error) {
    console.error('Error downloading chapter:', error);
  }
}

async function getCovers(mangaData:any[]) {
  const mangaWithCovers = await Promise.all(
    mangaData.map(async (manga) => {
      const coverResponse = await axios.get(`https://api.mangadex.org/cover/${manga.relationships.find((rel: any) => rel.type === 'cover_art').id}`);
      const cover = coverResponse.data.data.attributes.fileName
      return {
        ...manga,
        coverImage: `https://uploads.mangadex.org/covers/${manga.id}/${cover}`
      };
    })
  );

  return mangaWithCovers;
}

export async function searchHq(title:string) {
  try {
    const response = await axios.get(`${apiUrl}/search-hq`, {
      params: { q: title }
    });
    const hqData = response.data;

    return hqData;
  } catch (error) {
    console.error('Error searching hq:', error);
  }
}