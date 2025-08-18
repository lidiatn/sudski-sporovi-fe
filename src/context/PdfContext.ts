import { createContext } from 'react';
import type { OdgovorDto } from '../types/odgovorTypes';

export interface PdfContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  odgovor: OdgovorDto | null;
  setOdgovor: (data: OdgovorDto | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  selectedText: string | null;
  setSelectedText: (text: string | null) => void;
  selectedAnalysisBox: number | null;
  setSelectedAnalysisBox: (id: number | null) => void
  error: boolean
  setError: (val: boolean) => void;
}

export const PdfContext = createContext<PdfContextType | undefined>(undefined);