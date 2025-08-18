import {usePdfFile} from "../../hooks/usePdfFile.ts";
import FileUploader from "./FileUploader.tsx";
import React, {useState} from "react";
import UrlInput from "./UrlInput.tsx";
import {useClearContext} from "../../hooks/useClearContext.ts";
import {sendRequest} from "../../api/request.ts";

function UploadMenu() {
  const { file, setFile, setError, setLoading, setOdgovor, setSelectedText } = usePdfFile();
  const resetContext = useClearContext();
  const [urlInput, setUrlInput] = useState<string>("");
  const [errortext, setErrortext] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if(selectedFile){
      resetContext();
      setFile(selectedFile);
      setErrortext("");
    }
  };

  const handleRequest = async (path : "propisi" | "nepravilnosti" | null) => {
    if(!file || path==null) {
      setErrortext("Potrebno je učitati pdf odluku");
      return;
    }
    setLoading(true);
    setErrortext("");
    setSelectedText(null);
    try {
      const odgovor = await sendRequest(file, path, urlInput);
      setOdgovor(odgovor)
    }catch (error) {
      console.log(error);
      setLoading(false)
      setOdgovor(null)
      setError(true)
    }finally {
      setLoading(false)
    }
  };

  return (
      <div className="grid grid-rows-2 items-center w-full h-full justify-center bg-[var(--menu-bg)] px-4 py-2">

        <div className="w-full max-w-screen-xl items-center">

            <div className="flex items-center justify-center row-span-1 space-x-4">
              <div className="flex px-4">
                <h1 className="text-xl md:text-2xl text-white text-center font-['Arial', 'sans-serif'] whitespace-normal">
                  Odabir odluke
                </h1>
              </div>

              <div className="rounded-2xl shadow max-w-full ">
                <FileUploader onChange={handleFileChange}/>
              </div>
              {file && (
                <span className="text-base text-white font-['Arial', 'sans-serif'] truncate max-w-xs">
                      {file.name}
                  </span>
              )}
            </div>
        <div/>

        </div>
        <div className="flex items-center row-span-1">
          <div className="flex px-4">
            <h1 className="text-xl md:text-2xl font-['Arial', 'sans-serif'] text-white text-center min-w-[10rem] whitespace-normal">
              Vrsta analize
            </h1>
          </div>
          <div className="flex flex-row justify-center items-center w-full space-x-4">
            <button
                className={`min-w-[10rem] max-h-[2.5rem] bg-[var(--button-base)] border-black border-1 text-black font-['Arial', 'sans-serif'] rounded-md hover:bg-[var(--button-hover)] transition px-2 py-1 text-center`}
                onClick={() => handleRequest("nepravilnosti")}>
              Nađi nepravilnosti
            </button>
            <button
                className={`min-w-[13rem]  max-h-[2.5rem] bg-[var(--button-base)] border-black border-1 text-black font-['Arial', 'sans-serif'] rounded-md hover:bg-[var(--button-hover)] transition px-2 py-1 text-center`}
                onClick={() => handleRequest("propisi")}>
              Provjeri pravne propise
            </button>
            <div className="flex flex-row w-full min-w-[30rem] max-h-[2.0rem] space-x-2">
              <button className={`min-w-[17rem]  bg-[var(--button-base)] border-black border-1 text-black font-['Arial', 'sans-serif'] rounded-md hover:bg-[var(--button-hover)] transition px-2 py-1 text-center`}
                onClick={() => {
                  if (!urlInput) {
                    setErrortext("Potrebno je učitati link na propis");
                    return;
                  }
                  handleRequest("nepravilnosti");
                }}>
                Provjeri usklađenost s propisom
              </button>
              <UrlInput
                  className="flex-grow bg-white border p-2 rounded min-w-[10rem]"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
              {errortext && (
                  <p className="text-red-200 text-sm mt-2 text-center min-w-[10rem]">
                    {errortext}
                  </p>
              )}
            </div>
          </div>
        </div>
        )
        ;
        };

        export default UploadMenu;