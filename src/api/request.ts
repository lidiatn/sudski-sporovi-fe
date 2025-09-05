import type { OdgovorDto } from "../types/odgovorTypes";
import {usePdfFile} from "../hooks/usePdfFile.ts";
import {useRef} from "react";

export function useSendRequest(){

  const { setRetry, setOdgovor} = usePdfFile();
  const retriedRef = useRef(false);
  const successRef = useRef(false)

  const sendRequest = async (
      file: File,
      path: "propisi" | "nepravilnosti",
      zakonUrl?: string
  ) => {

    const formData = new FormData();
    formData.append("file", file);
    if (zakonUrl) formData.append("zakonUrl", zakonUrl);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/odluke/${path}`, {
      method: "POST",
      body: formData,
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");

      for (let i = 0; i < parts.length - 1; i++) {
        const clean = parts[i].replace(/^data:\s*\n?/, "");
        try {
          console.log("received response: ", clean)
          const parsedResult = JSON.parse(clean) as OdgovorDto;
          setOdgovor(parsedResult)
          setRetry(false)
          successRef.current = true
        } catch {
          if (!retriedRef.current) {
            retriedRef.current = true;
            console.log("retrying")
            setRetry(true)
            buffer = "";
          }
        }
      }
    }
    retriedRef.current = false;
    if(!successRef.current){
      setRetry(false)
      throw 500;
    }else{
      successRef.current = false
      return
    }
  }

  return { sendRequest };
}
