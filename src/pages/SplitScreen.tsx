
import PdfViewer from "../components/PdfViewer.tsx";
import {PdfAnalysis} from "../components/PdfAnalysis.tsx";
import Split from "react-split";
import UploadMenu from "../components/UploadMenu.tsx";
import {useEffect,  useState} from "react";
import {SingleScreen} from "../components/SingleScreen.tsx";
import {SINGLE_SCREEN_THRESHOLD} from "../constants.ts";

function SplitScreen()  {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div className="h-screen w-screen flex flex-col overflow-hidden">

        <div className="items-center bg-white shadow-md">
          <UploadMenu></UploadMenu>
        </div>

        <div className="w-full flex overflow-hidden">
          { screenWidth > SINGLE_SCREEN_THRESHOLD  &&
              <Split
              className="flex flex-row flex-1"
              sizes={[50, 50]}
              minSize={200}
              gutterSize={3}

          >
            <div className="flex flex-col w-full h-full bg-white">
              <div className="flex-1 overflow-auto flex justify-center items-center">
                <PdfViewer/>
              </div>
            </div>

            <div className="p-4 overflow-auto h-full">
              <PdfAnalysis/>
            </div>
          </Split>}
          { screenWidth <= SINGLE_SCREEN_THRESHOLD  &&
            <SingleScreen/>
          }
        </div>
      </div>
  );

}

export default SplitScreen