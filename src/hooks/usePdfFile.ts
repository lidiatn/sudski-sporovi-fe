import { useContext } from 'react';
import {PdfContext, type PdfContextType} from "../context/PdfContext.ts";

export const usePdfFile = (): PdfContextType => {
  const context = useContext(PdfContext);
  if (!context) {
    throw new Error('usePdfFile must be used within a PdfFileProvider');
  }
  return context;
};