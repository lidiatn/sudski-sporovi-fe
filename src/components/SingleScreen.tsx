import {usePdfFile} from "../hooks/usePdfFile.ts";
import {useEffect, useState} from "react";
import PdfViewer from "./PdfViewer.tsx";
import {PdfAnalysis} from "./PdfAnalysis.tsx";

export function SingleScreen() {
  const {loading, error, odgovor} = usePdfFile();
  const [activeTab, setActiveTab] = useState("file");

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "analysis"? "file": "analysis"));
  };

  useEffect(() => {
    if (loading && activeTab==="file") {
      toggleTab()
    }
  }, [loading]);

  useEffect(() => {
    if (!error && activeTab==="analysis") {
      toggleTab()
    }
  }, [error]);

  return (
      <div className="h-full w-full">
        <div className={`overflow-auto ${activeTab === "file" ? "h-full w-full" : "hidden"}`}>
          <PdfViewer/>
        </div>
        {activeTab === "analysis" &&
            <div className="p-4 overflow-auto h-full">
              <PdfAnalysis/>
            </div>
        }
        <button
            onClick={toggleTab}
            className={`absolute bottom-0 right-0 w-7 h-32 bg-[var(--button-base)]/40 rounded-md transform -translate-y-1/2
            text-blue-950 text-xs flex flex-row items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50
            ${odgovor || loading? "": "hidden"}`}
        >
              <div className="flex items-center justify-center h-full w-full">
                <span className="flex-none  [writing-mode:vertical-rl] rotate-180 font-['Arial', 'sans-serif']">
                      {activeTab === "analysis" ? "Rješenje" : activeTab === "file" && loading ? "Analiziram . . ." : "Rezultat"}
                </span>

              </div>
        </button>
      </div>
  );
}
