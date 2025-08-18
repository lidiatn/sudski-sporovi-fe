import ErrorModal from "./ErrorModal.tsx";
import { useClearContext } from "../hooks/useClearContext.ts";
import {LoadingSpinner} from "./Analysis/Loader.tsx";
import {NepravilnostCard} from "./Analysis/NepravilnostiCard.tsx";
import { PropisiCard } from "./Analysis/PropisiCard.tsx";
import {usePdfFile} from "../hooks/usePdfFile.ts";


export function PdfAnalysis() {
  const { loading, odgovor, setSelectedText, setSelectedAnalysisBox, selectedAnalysisBox, error } = usePdfFile();
  const clearContext = useClearContext();

  if (loading) return <LoadingSpinner />;

  if (odgovor?.nepravilnosti)
    if(odgovor.nepravilnosti.length==0)
      return (<div className="flex items-center justify-center">
                <span className="text-xl">
                  Nisu pronađene nepravilnosti.
                </span>
              </div>);
    else
      return (
          <div className="space-y-4">
            {odgovor.nepravilnosti.map((item, index) => (
                <NepravilnostCard
                    key={index}
                    nepravilnost={item.nepravilnost}
                    clanak={item.clanak}
                    objasnjenje={item.objasnjenje}
                />
            ))}
          </div>
    );

  if (odgovor?.clanci)
    if(odgovor.clanci.length==0)
      return (<div className="flex items-center justify-center">
                <span className="text-xl">
                  Nije pronađen ni jedan propis.
                </span>
      </div>);
    else
      return (
          <div className="space-y-4">
            {odgovor.clanci.map((item, index) => (
                <PropisiCard
                    key={index}
                    naziv={item.naziv}
                    tekstOdluke={item.tekstOdluke}
                    objasnjenje={item.objasnjenje}
                    onClick={() => {
                      if(index===selectedAnalysisBox){
                        setSelectedAnalysisBox(null);
                        setSelectedText(null);
                      }else {
                        setSelectedAnalysisBox(index);
                        setSelectedText(item.tekstOdluke);
                      }
                    }}
                    selected={selectedAnalysisBox===index}
                />
            ))}
          </div>
      );

  if(error) {
    return (
        <ErrorModal
            message="Došlo je do pogreške na servisu. Molimo pokušajte ponovno kasnije."
            onClose={clearContext}
        />
    );
  }
}