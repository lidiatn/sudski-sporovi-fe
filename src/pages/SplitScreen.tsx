
import PdfViewer from "../components/PdfViewer.tsx";
import {PdfAnalysis} from "../components/PdfAnalysis.tsx";
import Split from "react-split";
import UploadMenu from "../components/ui/UploadMenu.tsx";

function SplitScreen()  {

  return (
      <div className="h-screen w-screen flex flex-col overflow-hidden">

        <div className="h-[10%] w-full flex items-center bg-white shadow-md">
          <UploadMenu></UploadMenu>
        </div>

        <div className="h-[90%] w-full flex">
          <Split
              className="flex flex-row flex-1"
              sizes={[50, 50]}
              minSize={200}
              gutterSize={5}

          >
            <div className="flex flex-col w-full h-full bg-white">
              <div className="flex-1 overflow-auto flex justify-center items-center">
                <PdfViewer/>
              </div>
            </div>

            <div
                className="p-4 overflow-auto h-full"
            >
              <PdfAnalysis/>
            </div>
          </Split>
        </div>
      </div>
  );

}

export default SplitScreen