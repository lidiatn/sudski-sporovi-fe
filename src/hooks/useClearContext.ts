import {usePdfFile} from "./usePdfFile.ts";

export const useClearContext = () => {
  const { setOdgovor, setSelectedAnalysisBox, setError, setRetry, setLoading } = usePdfFile();

  return (): void => {
    setOdgovor(null);
    setSelectedAnalysisBox(null);
    setError(false);
    setRetry(false)
    setLoading(false)
  };
};