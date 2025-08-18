import {usePdfFile} from "./usePdfFile.ts";

export const useClearContext = () => {
  const { setOdgovor, setSelectedAnalysisBox, setError } = usePdfFile();

  return (): void => {
    setOdgovor(null);
    setSelectedAnalysisBox(null);
    setError(false);
  };
};