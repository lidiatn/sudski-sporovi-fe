import {usePdfFile} from "../hooks/usePdfFile.ts";
import FileUploader from "./ui/FileUploader.tsx";
import React, {useEffect, useState} from "react";
import UrlInput from "./ui/UrlInput.tsx";
import {useClearContext} from "../hooks/useClearContext.ts";
import {useSendRequest} from "../api/request.ts";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import {HIDE_MENU_THRESHOLD} from "../constants.ts";

function UploadMenu() {
  const { file, setFile, setError, setLoading, setOdgovor, setSelectedText } = usePdfFile();
  const resetContext = useClearContext();
  const [urlInput, setUrlInput] = useState<string>("");
  const [errortext, setErrortext] = useState<string>("");
  const { sendRequest } = useSendRequest();
  const [isOpen, setOpen] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if(selectedFile){
      resetContext();
      setFile(selectedFile);
      setErrortext("");
    }
  };

  useEffect(() => {
   if(!isOpen && screenWidth>HIDE_MENU_THRESHOLD)
     setOpen(true)
  }, [screenWidth]);

  const handleRequest = async (path : "propisi" | "nepravilnosti" | null) => {
    if(!file || path==null) {
      setErrortext("Potrebno je učitati pdf odluku");
      return;
    }
    setLoading(true);
    setErrortext("");
    setSelectedText(null);
    try {
      await sendRequest(file, path, urlInput);
    }catch {
      setLoading(false)
      setOdgovor(null)
      setError(true)
    }finally {
      setLoading(false)
    }
  };

  return (
      <div className="relative w-full">
        <button
            onClick={() => setOpen((o) => !o)}
            aria-controls="menuBar"
            className={`absolute right-1 -bottom-8 z-50 p-1 rounded-md bg-[var(--button-base)]/30 hover:bg-white/20 pointer-events-auto ${screenWidth>HIDE_MENU_THRESHOLD ? 'hidden' : ''}`}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={30} />}
        </button>

        <motion.div
            initial={{height: 0, opacity: 0}}
            animate={isOpen ? {height: "auto", opacity: 1} : {height: 0, opacity: 0}}
            transition={{duration: 0.4, ease: "easeInOut"}}
            className=""
        >
          <div className="flex flex-col items-center justify-center
                      w-full h-full bg-[var(--menu-bg)] px-4 py-1  space-y-0
                      md:py-3 md:space-y-4">

            <div className="w-full items-center justify-center">
              <div className="flex max-md:flex-col md:flex-row items-center justify-center
                           px-4 space-y-1 md:space-x-4">
                <div className="px-2">
                  <h1 className="text-base lg:text-2xl text-white text-center font-['Arial', 'sans-serif'] whitespace-normal">
                    Odabir odluke
                  </h1>
                </div>
                <div className="flex items-center space-x-2 max-w-2/3">
                  <div className="rounded-2xl shadow max-w-full min-w-[10.5rem] md:h-max-[2.5rem]">
                    <FileUploader onChange={handleFileChange}/>
                  </div>
                  {file && (
                      <span className="text-xs md:text-sm lg:text-base text-white font-['Arial', 'sans-serif'] truncate overflow-hidden ext-ellipsis max-w-xs">
                          {file.name}
                      </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex max-md:flex-col md:flex-row sm:mt-0 items-center">
              <h1 className="text-base text-white text-center  font-['Arial', 'sans-serif']  whitespace-normal
                            lg:min-w-[10rem]  lg:text-2xl ">
                Vrsta analize
              </h1>
              <div className="flex space-x-4 max-md:flex-col md:flex-row justify-center">
                <div className="flex flex-row w-full space-x-2
                              max-md:justify-center md:justify-end
                              lg:min-h-[3.0rem]">
                  <button
                      className={`bg-[var(--button-base)] border-black border-1 rounded-md hover:bg-[var(--button-hover)] transition px-2 py-1 
                              text-center text-xs text-black font-['Arial', 'sans-serif'] min-w-fit
                              lg:min-w-[10rem] lg:max-h-[2.5rem] lg:text-base `}
                      onClick={() => handleRequest("nepravilnosti")}>
                    Nađi nepravilnosti
                  </button>
                  <button
                      className={`bg-[var(--button-base)] border-black border-1 rounded-md 
                              hover:bg-[var(--button-hover)] transition px-2 py-1  min-w-fit
                              text-center text-xs text-black font-['Arial', 'sans-serif']
                              lg:text-base lg:min-w-[13rem]  lg:max-h-[2.5rem] `}
                      onClick={() => handleRequest("propisi")}>
                    Provjeri pravne propise
                  </button>
                </div>
                <div className="flex flex-row w-full max-h-[2.5rem] space-x-2 items-center max-md:justify-center md:justify-start">
                  <button
                      className={`bg-[var(--button-base)] border-black border-1 text-xs lg:text-base text-black font-['Arial', 'sans-serif'] 
                              min-w-fit rounded-md hover:bg-[var(--button-hover)] transition px-2 py-1 text-center md:min-h-[2.5rem] `}
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
                      className="flex-1 bg-white border rounded truncate max-w-[5.0rem] md:min-h-[2.5rem] xl:min-w-[10rem]"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                  />
                </div>
                {errortext && (
                    <p className="text-red-200 text-xs lg:text-sm text-center text-wrap m:break-words xl:min-w-[8rem]">
                      {errortext}
                    </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  )
      ;
};

export default UploadMenu;