import {useCallback, useEffect, useRef, useState} from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {usePdfFile} from "../hooks/usePdfFile.ts";
import jaroWinkler from "talisman/metrics/jaro-winkler";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer() {
  const { file, selectedText, setSelectedText, setSelectedAnalysisBox } = usePdfFile();
  const [numPages, setNumPages] = useState<number>();
  const [containerSize, setContainerSize] = useState({ width: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }


  useEffect(() => {
      highlightText();
  }, [selectedText, numPages]);


  function getSimilarity(a: string, b: string) {
    return jaroWinkler(a, b);
  }

  const highlightText = useCallback(() => {
    const layers = containerRef.current?.querySelectorAll('.react-pdf__Page__textContent');
    if (!layers?.length) return;

    const resetHighlights = (layers: any[] | NodeListOf<Element>) => {
      layers.forEach((layer) => {
        const spans = layer.querySelectorAll('span');
        spans.forEach((span: { innerHTML: string; textContent: string | null; }) => {
          const temp = document.createElement('div');
          temp.innerHTML = span.innerHTML;
          span.textContent = temp.textContent;
        });
      });
    }

    if (!selectedText || selectedText.trim() === '') {
      resetHighlights(layers)
      return;
    }

    const highlightByFuzzyMatch = () => {
      resetHighlights(layers)
      let fullText = '';
      const spanMap: { span: HTMLSpanElement; start: number; end: number }[] = [];
      layers.forEach((layer) => {
        const spans = Array.from(layer.querySelectorAll('span'));
        spans.forEach((span) => {
          const text = span.textContent || '';
          const start = fullText.length;
          const end = start + text.length;
          spanMap.push({ span, start, end });
          fullText += text;
        });
      });

      const windowSize = selectedText.length;
      const firstWord = selectedText.trim().split(/\s+/)[0].replace(/[.,:;!?()]/g, '');
      const wordRegex = new RegExp(`\\b${firstWord}\\b`, 'gi');

      const matchCandidates: number[] = [];
      let match: RegExpExecArray | null;

      while ((match = wordRegex.exec(fullText)) !== null) {
        matchCandidates.push(match.index);
      }

      let bestMatch = { index: -1, score: 0 };

      for (const i of matchCandidates) {
        const window = fullText.slice(i, i + windowSize);
        const score = getSimilarity(window, selectedText);
        if (score > bestMatch.score) {
          bestMatch = { index: i, score };
        }
      }

      if (bestMatch.score < 0.7) {
        console.warn('No sufficiently similar text found');
        return;
      }

      const matchIndex = bestMatch.index;
      const matchEnd = matchIndex + selectedText.length;

      let scrolled = false;

      spanMap.forEach(({ span, start, end }) => {
        const overlapStart = Math.max(start, matchIndex);
        const overlapEnd = Math.min(end, matchEnd);

        if (overlapStart < overlapEnd) {
          const spanText = span.textContent || '';
          const relStart = overlapStart - start;
          const relEnd = overlapEnd - start;

          const before = spanText.slice(0, relStart);
          const match = spanText.slice(relStart, relEnd);
          const after = spanText.slice(relEnd);

          const highlightId = 'pdf-highlight';
          span.innerHTML = `${before}<mark id="${highlightId}" style="background: rgb(193, 199, 222, 1);">${match}</mark>${after}`;
          if (!scrolled) {
            setTimeout(() => {
              const el = document.getElementById(highlightId);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 0);
            scrolled = true;
          }
        }
      });
    };

    const timeout = setTimeout(highlightByFuzzyMatch, 300);
    return () => clearTimeout(timeout);
  },[selectedText, numPages]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({ width: containerRef.current.offsetWidth })
        setSelectedAnalysisBox(null);
        setSelectedText(null);
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
      <div ref={containerRef} className="h-full w-full overflow-y-auto px-2">
        {file && (
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
              {Array.from(new Array(numPages), (_, index) => (
                  <div key={`page_${index + 1}`} className="flex justify-center my-4">
                    <Page
                        pageNumber={index + 1}
                        width={Math.min(containerSize.width * 0.95, 1000)}
                    />
                  </div>
              ))}
            </Document>
        )}
      </div>
  );
}

export default PdfViewer;