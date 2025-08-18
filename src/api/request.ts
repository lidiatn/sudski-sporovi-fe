import type { OdgovorDto } from "../types/odgovorTypes";

export async function sendRequest(

    file: File,
    path: "propisi" | "nepravilnosti",
    zakonUrl?: string

): Promise<OdgovorDto> {

  const formData = new FormData();
  formData.append("file", file);
  if (zakonUrl) formData.append("zakonUrl", zakonUrl);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/odluke/${path}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Greška prilikom slanja zahtjeva.");
  }

  const rawResult = await response.json();
  const parsedResult: OdgovorDto = {};

  if (rawResult.propisi) {
    parsedResult.clanci = rawResult.propisi;
  } else if (rawResult.nepravilnosti) {
    parsedResult.nepravilnosti = rawResult.nepravilnosti;
  } else {
    console.warn("Neočekivani format odgovora", rawResult);
  }

  return parsedResult;
}