import {type ReactNode, useState} from 'react';
import { PdfContext, type PdfContextType} from './PdfContext.ts';
import type { OdgovorDto } from '../types/odgovorTypes';

export const PdfFileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [odgovor, setOdgovor] = useState<OdgovorDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedAnalysisBox, setSelectedAnalysisBox] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const value: PdfContextType = {
    file,
    setFile,
    odgovor,
    setOdgovor,
    loading,
    setLoading,
    selectedText,
    setSelectedText,
    selectedAnalysisBox,
    setSelectedAnalysisBox,
    error,
    setError
  };

  return <PdfContext.Provider value={value}> {children} </PdfContext.Provider>;
};